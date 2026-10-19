-- ====================================================================
-- ABU BAKR PERSONAL BRAND PLATFORM - SUPABASE POSTGRESQL SCHEMA
-- Fully relational, indexed, and protected with Row Level Security (RLS)
-- ====================================================================

-- 1. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Abu Bakr',
  title TEXT NOT NULL DEFAULT 'Designer, Builder & Entrepreneur',
  hero_tagline TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Dhaka, Bangladesh',
  coordinates TEXT NOT NULL DEFAULT '23.8103° N, 90.4125° E',
  age TEXT NOT NULL DEFAULT '18',
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  profile_image TEXT,
  profile_cutout TEXT,
  origin_image TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  vision_statement TEXT NOT NULL,
  vision_details TEXT NOT NULL,
  origin_story TEXT NOT NULL,
  default_seo_title TEXT,
  default_seo_description TEXT,
  available_for_work BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS & CASE STUDIES
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  year TEXT NOT NULL,
  role TEXT NOT NULL,
  short_description TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  problem TEXT NOT NULL,
  idea TEXT NOT NULL,
  process TEXT NOT NULL,
  result TEXT NOT NULL,
  personal_contribution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  live_url TEXT,
  github_url TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPERIENCE TIMELINE
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  current BOOLEAN DEFAULT FALSE,
  description TEXT NOT NULL,
  achievements JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  logo TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CURRENTLY BUILDING
CREATE TABLE IF NOT EXISTS currently_building (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project TEXT NOT NULL,
  what_it_is TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('BUILDING', 'EXPERIMENT', 'ACTIVE', 'PAUSED', 'COMING SOON')),
  link TEXT,
  progress INT DEFAULT 0,
  tags JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. JOURNAL ARTICLES
CREATE TABLE IF NOT EXISTS journal_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  published_date TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Abu Bakr',
  reading_time TEXT DEFAULT '4 min read',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar TEXT,
  featured BOOLEAN DEFAULT TRUE,
  rating INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TOOLBOX / SKILLS
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT MESSAGES / INQUIRIES
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE currently_building ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS FOR PUBLISHED CONTENT
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read currently_building" ON currently_building FOR SELECT USING (true);
CREATE POLICY "Public read published journal" ON journal_articles FOR SELECT USING (published = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read skill_categories" ON skill_categories FOR SELECT USING (true);

-- PUBLIC INSERT FOR MESSAGES (CONTACT FORM)
CREATE POLICY "Public insert message" ON messages FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access experience" ON experience FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access currently_building" ON currently_building FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access journal_articles" ON journal_articles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access skill_categories" ON skill_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access messages" ON messages FOR ALL TO authenticated USING (true);
