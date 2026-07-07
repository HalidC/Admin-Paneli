import React, { useState, useEffect } from 'react';
import { blogService } from '../../../lib/services/blog-service';
import { BlogPost } from '../../../types/blog';
import { PageHeader } from '../../../components/layout/page-header';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { Input, Textarea, Select } from '../../../components/ui/input';
import { STATUS_OPTIONS } from '../../../config/status-options';
import { Plus, Edit2, BookOpen, Clock, Eye, RefreshCw } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('');
  const [status, setStatus] = useState<BlogPost['status']>('draft');

  const fetchPosts = async () => {
    setLoading(true);
    const data = await blogService.getAll();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAdd = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setSummary('');
    setContent('');
    setCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800');
    setTags('Tasarım, SaaS');
    setReadTime('5 dk okuma');
    setStatus('draft');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary);
    setContent(post.content);
    setCoverImage(post.coverImage || '');
    setTags(post.tags.join(', '));
    setReadTime(post.readTime);
    setStatus(post.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = {
      title,
      slug,
      summary,
      content,
      coverImage,
      tags: tagArray,
      readTime,
      status,
      author: {
        name: editingPost?.author.name || 'Kaan Aksoy',
        avatar: editingPost?.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      },
    };

    if (editingPost) {
      const updated = await blogService.update(editingPost.id, payload);
      setPosts(posts.map((p) => (p.id === editingPost.id ? updated : p)));
    } else {
      const created = await blogService.create({
        ...payload,
        publishedAt: status === 'published' ? new Date().toISOString() : undefined,
      });
      setPosts([...posts, created]);
    }
    setIsModalOpen(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: BlogPost['status']) => {
    const updated = await blogService.update(id, { status: newStatus });
    setPosts(posts.map((p) => (p.id === id ? updated : p)));
  };

  const getStatusBadge = (s: BlogPost['status']) => {
    const option = STATUS_OPTIONS.blogPost.find((opt) => opt.value === s);
    return (
      <Badge variant={option?.color as any || 'neutral'}>
        {option?.label || s}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Blog Yazıları"
        description="SaaS sitenizin organik trafiğini artıracak zengin teknik makaleleri, rehberleri ve kurumsal duyuruları yayınlayın."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Yeni Yazı
          </Button>
        }
      />

      {/* Blog items list */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kapak & Başlık</TableHead>
            <TableHead>Etiketler</TableHead>
            <TableHead>Okuma Süresi</TableHead>
            <TableHead>Ziyaret Sayısı</TableHead>
            <TableHead>Yayın Durumu</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <img
                    referrerPolicy="no-referrer"
                    src={post.coverImage}
                    alt={post.title}
                    className="h-10 w-16 object-cover rounded bg-slate-100 border border-slate-100"
                  />
                  <div className="max-w-md">
                    <span className="font-semibold text-slate-900 block truncate tracking-tight">{post.title}</span>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{post.summary}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {post.readTime}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                  {post.viewCount}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(post.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Button variant="ghost" size="xs" onClick={() => handleOpenEdit(post)} className="p-1 h-7 w-7" title="Düzenle">
                    <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                  </Button>
                  {post.status !== 'archived' && (
                    <Button variant="ghost" size="xs" onClick={() => handleStatusUpdate(post.id, 'archived')} className="px-2 h-7 text-[11px] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                      Arşivle
                    </Button>
                  )}
                  {post.status !== 'inactive' && (
                    <Button variant="ghost" size="xs" onClick={() => handleStatusUpdate(post.id, 'inactive')} className="px-2 h-7 text-[11px] font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-700">
                      Pasifleştir
                    </Button>
                  )}
                  {post.status !== 'draft' && (
                    <Button variant="ghost" size="xs" onClick={() => handleStatusUpdate(post.id, 'draft')} className="px-2 h-7 text-[11px] font-semibold text-amber-600 hover:bg-amber-50 hover:text-amber-700">
                      Taslak
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı Oluştur'}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Kaydet
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Yazı Başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="örn. SaaS Sektöründe Linear Estetiği"
          />

          <Input
            label="URL Sülüğü (Slug)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="örn. saas-linear-estetigi"
          />

          <Input
            label="Kısa Özet (Summary)"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            placeholder="Sosyal medyada ve kart listelerinde gözükecek kısa özet..."
          />

          <Textarea
            label="Yazı İçeriği (Markdown Uyumlu)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Makale metnini buraya girin..."
            rows={5}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Kapak Görseli URL'si"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Görsel adresi..."
            />
            <Input
              label="Okuma Süresi"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="örn. 5 dk okuma"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Etiketler (Virgülle Ayırın)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="örn. Tasarım, SaaS, Trend"
            />
            <Select
              label="Yayın Durumu"
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              options={[
                { value: 'published', label: 'Yayına Al' },
                { value: 'draft', label: 'Taslak Olarak Tut' },
                { value: 'scheduled', label: 'İleri Tarihe Planla' },
                { value: 'archived', label: 'Arşive Kaldır' },
                { value: 'inactive', label: 'Pasifleştir' },
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
