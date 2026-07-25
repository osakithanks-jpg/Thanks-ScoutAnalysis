import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

/**
 * 1. 個人実績追加・変更時のチーム集計アトミック自動更新 Trigger
 */
export const onScoutResultWrite = functions.firestore
  .document('scout_results/{resultId}')
  .onWrite(async (change, context) => {
    const beforeData = change.before.exists ? change.before.data() : null;
    const afterData = change.after.exists ? change.after.data() : null;

    const targetDate = (afterData || beforeData)?.date;
    const targetJobId = (afterData || beforeData)?.jobId;
    const targetMediaId = (afterData || beforeData)?.mediaId;

    if (!targetDate || !targetJobId || !targetMediaId) return;

    const bSent = (beforeData && beforeData.status === 'active') ? (beforeData.sentCount || 0) : 0;
    const bTotRep = (beforeData && beforeData.status === 'active') ? (beforeData.totalReplyCount || 0) : 0;
    const bEffRep = (beforeData && beforeData.status === 'active') ? (beforeData.effectiveReplyCount || 0) : 0;

    const aSent = (afterData && afterData.status === 'active') ? (afterData.sentCount || 0) : 0;
    const aTotRep = (afterData && afterData.status === 'active') ? (afterData.totalReplyCount || 0) : 0;
    const aEffRep = (afterData && afterData.status === 'active') ? (afterData.effectiveReplyCount || 0) : 0;

    const deltaSent = aSent - bSent;
    const deltaTotRep = aTotRep - bTotRep;
    const deltaEffRep = aEffRep - bEffRep;

    const aggDocRef = db.collection('team_aggregates').doc(`${targetDate}_${targetJobId}_${targetMediaId}`);

    await db.runTransaction(async (transaction) => {
      const aggDoc = await transaction.get(aggDocRef);

      if (!aggDoc.exists) {
        transaction.set(aggDocRef, {
          aggregateId: `${targetDate}_${targetJobId}_${targetMediaId}`,
          date: targetDate,
          jobId: targetJobId,
          mediaId: targetMediaId,
          teamSentCount: Math.max(0, deltaSent),
          teamTotalReplyCount: Math.max(0, deltaTotRep),
          teamEffectiveReplyCount: Math.max(0, deltaEffRep),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        const curData = aggDoc.data() || {};
        transaction.update(aggDocRef, {
          teamSentCount: Math.max(0, (curData.teamSentCount || 0) + deltaSent),
          teamTotalReplyCount: Math.max(0, (curData.teamTotalReplyCount || 0) + deltaTotRep),
          teamEffectiveReplyCount: Math.max(0, (curData.teamEffectiveReplyCount || 0) + deltaEffRep),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    });
  });

/**
 * 2. 全データリセット Callable Function (パスワード Thanks5877 認証)
 */
export const adminResetAllData = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '認証が必要です。');
  }

  // Check Admin role
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', '管理者権限が必要です。');
  }

  // Verify password Thanks5877
  const inputPassword = data.password;
  if (inputPassword !== 'Thanks5877') {
    throw new functions.https.HttpsError('invalid-argument', 'パスワードが一致しません。');
  }

  const collectionsToWipe = [
    'jobs',
    'user_jobs',
    'scout_results',
    'team_aggregates',
    'knowledge',
    'scout_templates',
    'template_versions',
    'template_assignments',
    'notifications'
  ];

  for (const colName of collectionsToWipe) {
    const snapshot = await db.collection(colName).get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }

  // Record audit log
  await db.collection('audit_logs').add({
    entityType: 'system',
    entityId: 'master_reset',
    actionType: 'RESET',
    userId: context.auth.uid,
    userName: userDoc.data()?.displayName || '管理者',
    userRole: 'admin',
    reason: '管理者による全データリセット (Thanks5877 認証済)',
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true, message: '全業務データがリセットされました。' };
});
