'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { Project } from '@/types';
import styles from './ProjectForm.module.css';

interface Props {
  initialData?: Project;
}

export default function ProjectForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle ?? '');
  const [tag, setTag] = useState(initialData?.tag ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [longDescription, setLongDescription] = useState(initialData?.longDescription ?? '');
  const [year, setYear] = useState(initialData?.year ?? '');
  const [role, setRole] = useState(initialData?.role ?? '');
  const [href, setHref] = useState(initialData?.href ?? '');
  const [arrowLabel, setArrowLabel] = useState(initialData?.arrowLabel ?? '');
  const [liveHref, setLiveHref] = useState(initialData?.liveHref ?? '');
  const [techInput, setTechInput] = useState(initialData?.tech?.join(', ') ?? '');
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights ?? ['']);
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl ?? '');

  const coverRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.coverImage ?? '');
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images ?? []);

  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  }

  function addHighlight() {
    setHighlights((prev) => [...prev, '']);
  }

  function updateHighlight(idx: number, val: string) {
    setHighlights((prev) => prev.map((h, i) => (i === idx ? val : h)));
  }

  function removeHighlight(idx: number) {
    setHighlights((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setErrorMsg('');

    const projectId = initialData?.id ?? `project-${Date.now()}`;
    const fd = new FormData();

    fd.append('id', projectId);
    fd.append('title', title);
    if (subtitle) fd.append('subtitle', subtitle);
    fd.append('tag', tag);
    fd.append('description', description);
    if (longDescription) fd.append('longDescription', longDescription);
    if (year) fd.append('year', year);
    if (role) fd.append('role', role);
    fd.append('href', href);
    if (arrowLabel) fd.append('arrowLabel', arrowLabel);
    if (liveHref) fd.append('liveHref', liveHref);
    fd.append('tech', techInput);
    highlights.filter(Boolean).forEach((h) => fd.append('highlights', h));
    if (videoUrl) fd.append('videoUrl', videoUrl);

    const coverFile = coverRef.current?.files?.[0];
    if (coverFile) {
      fd.append('coverImage', coverFile);
    } else if (initialData?.coverImage) {
      fd.append('coverImageUrl', initialData.coverImage);
    }

    const imageFiles = imagesRef.current?.files;
    if (imageFiles) {
      Array.from(imageFiles).forEach((f) => fd.append('images', f));
    }

    const url = isEdit ? `/api/admin/projects/${projectId}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, body: fd });
      if (res.ok) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Save failed');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    }
  }

  const techPills = techInput.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Basic Info */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Basic Info</p>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">Title *</label>
            <input id="title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="subtitle">Subtitle</label>
            <input id="subtitle" className={styles.input} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="tag">Tag *</label>
            <input id="tag" className={styles.input} value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Open Source · Backend" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="year">Year</label>
            <input id="year" className={styles.input} value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="role">Role</label>
            <input id="role" className={styles.input} value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Lead Engineer" />
          </div>
          <div className={styles.field}></div>
          <div className={styles.fieldFull}>
            <label className={styles.label} htmlFor="description">Short Description *</label>
            <textarea id="description" className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className={styles.fieldFull}>
            <label className={styles.label} htmlFor="longDescription">Long Description</label>
            <textarea id="longDescription" className={styles.textarea} style={{ minHeight: '120px' }} value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Links</p>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="href">GitHub URL *</label>
            <input id="href" type="url" className={styles.input} value={href} onChange={(e) => setHref(e.target.value)} placeholder="https://github.com/..." required />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="arrowLabel">GitHub Button Label</label>
            <input id="arrowLabel" className={styles.input} value={arrowLabel} onChange={(e) => setArrowLabel(e.target.value)} placeholder="e.g. View on GitHub" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="liveHref">Live Demo URL</label>
            <input id="liveHref" type="url" className={styles.input} value={liveHref} onChange={(e) => setLiveHref(e.target.value)} placeholder="https://..." />
          </div>
        </div>
      </div>

      {/* Tech & Highlights */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Tech & Highlights</p>
        <div className={styles.field} style={{ marginBottom: '16px' }}>
          <label className={styles.label} htmlFor="tech">Technologies</label>
          <input
            id="tech"
            className={styles.input}
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, TypeScript, Node.js"
          />
          <span className={styles.hint}>Comma-separated</span>
          {techPills.length > 0 && (
            <div className={styles.pills}>
              {techPills.map((t) => <span key={t} className={styles.pill}>{t}</span>)}
            </div>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Highlights</label>
          {highlights.map((h, i) => (
            <div key={i} className={styles.highlightRow}>
              <input
                className={styles.input}
                value={h}
                onChange={(e) => updateHighlight(i, e.target.value)}
                placeholder={`Highlight ${i + 1}`}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeHighlight(i)}
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className={styles.addHighlightBtn} onClick={addHighlight}>
            + Add highlight
          </button>
        </div>
      </div>

      {/* Media */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Media</p>
        <div className={styles.field} style={{ marginBottom: '16px' }}>
          <label className={styles.label} htmlFor="coverImage">Cover Image</label>
          <input
            id="coverImage"
            type="file"
            accept="image/*"
            className={styles.input}
            ref={coverRef}
            onChange={handleCoverChange}
          />
          {coverPreview && (
            <img src={coverPreview} alt="Cover preview" className={styles.mediaThumb} />
          )}
        </div>
        <div className={styles.field} style={{ marginBottom: '16px' }}>
          <label className={styles.label} htmlFor="images">Additional Images</label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            className={styles.input}
            ref={imagesRef}
            onChange={handleImagesChange}
          />
          {imagePreviews.length > 0 && (
            <div className={styles.mediaPreview}>
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt={`Preview ${i + 1}`} className={styles.mediaThumb} />
              ))}
            </div>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="videoUrl">Video URL</label>
          <input
            id="videoUrl"
            type="url"
            className={styles.input}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/embed/..."
          />
          <span className={styles.hint}>Paste a YouTube/Vimeo embed URL</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Project'}
        </button>
        <Link href="/admin/projects" className={styles.cancelBtn}>
          Cancel
        </Link>
        {status === 'error' && <span className={styles.errorMsg}>{errorMsg}</span>}
      </div>
    </form>
  );
}
