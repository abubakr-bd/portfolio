import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Project, Experience, CurrentlyBuilding, JournalArticle, Testimonial, SkillCategory, Message, SiteSettings } from './types';
import { initialData } from '@/data/initial-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
function ensureDbFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Read database
export function getDb(): DatabaseSchema {
  try {
    ensureDbFile();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      settings: parsed.settings || initialData.settings,
      projects: parsed.projects || initialData.projects,
      experience: parsed.experience || initialData.experience,
      currentlyBuilding: parsed.currentlyBuilding || initialData.currentlyBuilding,
      journal: parsed.journal || initialData.journal,
      testimonials: parsed.testimonials || initialData.testimonials,
      skills: parsed.skills || initialData.skills,
      messages: parsed.messages || initialData.messages,
    };
  } catch (error) {
    console.error('Error reading db.json, returning initialData:', error);
    return initialData;
  }
}

// Write database atomically
export function saveDb(data: DatabaseSchema): boolean {
  try {
    ensureDbFile();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (error) {
    console.error('Error writing db.json:', error);
    return false;
  }
}

// Settings
export function getSettings(): SiteSettings {
  return getDb().settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  db.settings = { ...db.settings, ...settings };
  saveDb(db);
  return db.settings;
}

// Projects
export function getProjects(publishedOnly = false): Project[] {
  const db = getDb();
  let list = db.projects;
  if (publishedOnly) {
    list = list.filter((p) => p.published);
  }
  return list.sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getProjectBySlug(slug: string): Project | undefined {
  const db = getDb();
  return db.projects.find((p) => p.slug === slug);
}

export function saveProject(project: Project): Project {
  const db = getDb();
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = project;
  } else {
    db.projects.push(project);
  }
  saveDb(db);
  return project;
}

export function deleteProject(id: string): boolean {
  const db = getDb();
  db.projects = db.projects.filter((p) => p.id !== id);
  return saveDb(db);
}

// Experience
export function getExperiences(): Experience[] {
  const db = getDb();
  return db.experience.sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function saveExperience(item: Experience): Experience {
  const db = getDb();
  const index = db.experience.findIndex((e) => e.id === item.id);
  if (index >= 0) {
    db.experience[index] = item;
  } else {
    db.experience.push(item);
  }
  saveDb(db);
  return item;
}

export function deleteExperience(id: string): boolean {
  const db = getDb();
  db.experience = db.experience.filter((e) => e.id !== id);
  return saveDb(db);
}

// Currently Building
export function getCurrentlyBuilding(): CurrentlyBuilding[] {
  const db = getDb();
  return db.currentlyBuilding.sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function saveCurrentlyBuilding(item: CurrentlyBuilding): CurrentlyBuilding {
  const db = getDb();
  const index = db.currentlyBuilding.findIndex((cb) => cb.id === item.id);
  if (index >= 0) {
    db.currentlyBuilding[index] = item;
  } else {
    db.currentlyBuilding.push(item);
  }
  saveDb(db);
  return item;
}

export function deleteCurrentlyBuilding(id: string): boolean {
  const db = getDb();
  db.currentlyBuilding = db.currentlyBuilding.filter((cb) => cb.id !== id);
  return saveDb(db);
}

// Journal
export function getArticles(publishedOnly = false): JournalArticle[] {
  const db = getDb();
  let list = db.journal;
  if (publishedOnly) {
    list = list.filter((a) => a.published);
  }
  return list;
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  const db = getDb();
  return db.journal.find((a) => a.slug === slug);
}

export function saveArticle(article: JournalArticle): JournalArticle {
  const db = getDb();
  const index = db.journal.findIndex((a) => a.id === article.id);
  if (index >= 0) {
    db.journal[index] = article;
  } else {
    db.journal.push(article);
  }
  saveDb(db);
  return article;
}

export function deleteArticle(id: string): boolean {
  const db = getDb();
  db.journal = db.journal.filter((a) => a.id !== id);
  return saveDb(db);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  const db = getDb();
  return db.testimonials;
}

export function saveTestimonial(item: Testimonial): Testimonial {
  const db = getDb();
  const index = db.testimonials.findIndex((t) => t.id === item.id);
  if (index >= 0) {
    db.testimonials[index] = item;
  } else {
    db.testimonials.push(item);
  }
  saveDb(db);
  return item;
}

export function deleteTestimonial(id: string): boolean {
  const db = getDb();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  return saveDb(db);
}

// Skills
export function getSkills(): SkillCategory[] {
  const db = getDb();
  return db.skills;
}

export function saveSkills(categories: SkillCategory[]): boolean {
  const db = getDb();
  db.skills = categories;
  return saveDb(db);
}

// Messages / Inquiries
export function getMessages(): Message[] {
  const db = getDb();
  return db.messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addMessage(msg: Omit<Message, 'id' | 'createdAt' | 'status'>): Message {
  const db = getDb();
  const newMsg: Message = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  db.messages.unshift(newMsg);
  saveDb(db);
  return newMsg;
}

export function updateMessageStatus(id: string, status: 'new' | 'read' | 'replied'): boolean {
  const db = getDb();
  const item = db.messages.find((m) => m.id === id);
  if (item) {
    item.status = status;
    return saveDb(db);
  }
  return false;
}

export function deleteMessage(id: string): boolean {
  const db = getDb();
  db.messages = db.messages.filter((m) => m.id !== id);
  return saveDb(db);
}
