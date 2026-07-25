-- =========================================================================
-- スカウト分析・ナレッジ蓄積ツール (Ver.3.5 - Supabase クラウド共有 & RLS セキュリティ設定 SQL)
-- 株式会社サンクスパートナーズ 社内共有用 (月額0円構成)
-- =========================================================================

-- 1. ユーザーロール管理テーブル
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member', -- 'admin' または 'member'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 担当者マスタテーブル
CREATE TABLE IF NOT EXISTS public.assignees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 求人マスタテーブル
CREATE TABLE IF NOT EXISTS public.jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    occupation TEXT,
    status TEXT NOT NULL DEFAULT 'スカウト実施中',
    prefecture TEXT,
    area TEXT,
    industry TEXT,
    created_at DATE DEFAULT CURRENT_DATE
);

-- 4. 担当求人アサインテーブル
CREATE TABLE IF NOT EXISTS public.assignments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    job_id TEXT NOT NULL,
    assigned_at DATE DEFAULT CURRENT_DATE,
    is_hidden BOOLEAN DEFAULT FALSE,
    hidden_at DATE,
    status TEXT NOT NULL DEFAULT 'active'
);

-- 5. スカウト実績データテーブル
CREATE TABLE IF NOT EXISTS public.records (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    job_id TEXT NOT NULL,
    assignee_id TEXT NOT NULL,
    media_id TEXT NOT NULL,
    sent_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    notes TEXT
);

-- 6. 求人振り返り・ナレッジテーブル
CREATE TABLE IF NOT EXISTS public.knowledge (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    author_name TEXT,
    entry_date DATE DEFAULT CURRENT_DATE,
    target_period TEXT,
    good_media TEXT,
    bad_media TEXT,
    candidate_features TEXT,
    good_scout_text TEXT,
    free_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- Row Level Security (RLS) の有効化 ＆ セキュリティポリシー設定
-- =========================================================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------------------
-- user_roles ポリシー
-- -------------------------------------------------------------------------
CREATE POLICY "user_roles_select_authenticated" ON public.user_roles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "user_roles_all_admin" ON public.user_roles
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- -------------------------------------------------------------------------
-- assignees / jobs / assignments / records / knowledge ポリシー
-- (ログイン済み社員は 参照・追加・更新が可能 / 削除は管理者のみ)
-- -------------------------------------------------------------------------

-- SELECT
CREATE POLICY "assignees_select" ON public.assignees FOR SELECT TO authenticated USING (true);
CREATE POLICY "jobs_select" ON public.jobs FOR SELECT TO authenticated USING (true);
CREATE POLICY "assignments_select" ON public.assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "records_select" ON public.records FOR SELECT TO authenticated USING (true);
CREATE POLICY "knowledge_select" ON public.knowledge FOR SELECT TO authenticated USING (true);

-- INSERT
CREATE POLICY "assignees_insert" ON public.assignees FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "jobs_insert" ON public.jobs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "assignments_insert" ON public.assignments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "records_insert" ON public.records FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "knowledge_insert" ON public.knowledge FOR INSERT TO authenticated WITH CHECK (true);

-- UPDATE
CREATE POLICY "assignees_update" ON public.assignees FOR UPDATE TO authenticated USING (true);
CREATE POLICY "jobs_update" ON public.jobs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "assignments_update" ON public.assignments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "records_update" ON public.records FOR UPDATE TO authenticated USING (true);
CREATE POLICY "knowledge_update" ON public.knowledge FOR UPDATE TO authenticated USING (true);

-- DELETE (全データリセット等: 管理者 admin のみ許可)
CREATE POLICY "assignees_delete_admin" ON public.assignees FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "jobs_delete_admin" ON public.jobs FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "assignments_delete_admin" ON public.assignments FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "records_delete_admin" ON public.records FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "knowledge_delete_admin" ON public.knowledge FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- =========================================================================
-- 新規ユーザーサインアップ時の user_roles 自動追加トリガー関数
-- =========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, email, role)
    VALUES (
        NEW.id,
        NEW.email,
        -- 最初の1名、または特定の管理者メールアドレスを admin にし、それ以外を member に設定可能
        CASE WHEN (SELECT COUNT(*) FROM public.user_roles) = 0 THEN 'admin' ELSE 'member' END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
