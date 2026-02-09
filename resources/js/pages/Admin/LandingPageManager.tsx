import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Shield, Users, LogOut, Briefcase, Edit2, Save, X, Image as ImageIcon, Eye, Newspaper, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getAnnouncements, updateAnnouncements, getHRNews, updateHRNews, type Announcement, type HRNewsItem } from '@/data/mockData';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LandingPageManager({ auth }: { auth: any }) {
    const admin = auth?.user || { name: 'Admin' };
    const [activeTab, setActiveTab] = useState('announcements');

    // Announcements State
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null);
    const [announcementFormData, setAnnouncementFormData] = useState<Partial<Announcement>>({});
    const [previewAnnouncementImage, setPreviewAnnouncementImage] = useState<string>('');

    // Newsroom State
    const [newsItems, setNewsItems] = useState<HRNewsItem[]>([]);
    const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
    const [newsFormData, setNewsFormData] = useState<Partial<HRNewsItem>>({});
    const [newsImageUrl, setNewsImageUrl] = useState<string>('');

    useEffect(() => {
        setAnnouncements(getAnnouncements());
        setNewsItems(getHRNews());
    }, []);

    const handleLogout = () => {
        router.post('/logout');
    };

    // Announcement Handlers
    const handleEditAnnouncement = (announcement: Announcement) => {
        setEditingAnnouncementId(announcement.id);
        setAnnouncementFormData({ ...announcement });
        setPreviewAnnouncementImage(announcement.image);
    };

    const handleSaveAnnouncement = () => {
        if (!editingAnnouncementId || !announcementFormData.title || !announcementFormData.description || !announcementFormData.image) {
            toast.error('Please fill in all fields');
            return;
        }

        const updatedAnnouncements = announcements.map(item =>
            item.id === editingAnnouncementId
                ? { ...item, ...announcementFormData }
                : item
        );

        updateAnnouncements(updatedAnnouncements);
        setAnnouncements(updatedAnnouncements);
        setEditingAnnouncementId(null);
        setAnnouncementFormData({});
        setPreviewAnnouncementImage('');
        toast.success('Announcement updated successfully!');
    };

    const handleCancelAnnouncement = () => {
        setEditingAnnouncementId(null);
        setAnnouncementFormData({});
        setPreviewAnnouncementImage('');
    };

    const handleAnnouncementImageChange = (url: string) => {
        setAnnouncementFormData({ ...announcementFormData, image: url });
        setPreviewAnnouncementImage(url);
    };

    // Newsroom Handlers
    const handleEditNews = (newsItem: HRNewsItem) => {
        setEditingNewsId(newsItem.id);
        setNewsFormData({ ...newsItem });
        setNewsImageUrl('');
    };

    const handleSaveNews = () => {
        if (!editingNewsId || !newsFormData.title || !newsFormData.date || !newsFormData.category || !newsFormData.summary) {
            toast.error('Please fill in all required fields');
            return;
        }

        const updatedNews = newsItems.map(item =>
            item.id === editingNewsId
                ? { ...item, ...newsFormData }
                : item
        );

        updateHRNews(updatedNews);
        setNewsItems(updatedNews);
        setEditingNewsId(null);
        setNewsFormData({});
        setNewsImageUrl('');
        toast.success('News article updated successfully!');
    };

    const handleCancelNews = () => {
        setEditingNewsId(null);
        setNewsFormData({});
        setNewsImageUrl('');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <nav className="bg-[#193153] text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/10 p-2 rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                                <img src="/images/PhilSCA_Logo.png" alt="NAAP Logo" className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <Link href="/admin/dashboard" className="hover:text-blue-200 transition-colors">
                                    <span className="font-bold text-lg block leading-none">NAAP HR Admin</span>
                                    <span className="text-[10px] text-blue-200 uppercase tracking-widest">Portal</span>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/admin/dashboard">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/admin/jobs">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Jobs
                                </Button>
                            </Link>
                            <Link href="/admin/applicants">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Users className="h-4 w-4 mr-2" />
                                    Applicants
                                </Button>
                            </Link>
                            <Link href="/admin/staffing">
                                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#ffdd59]">
                                    <Users className="h-4 w-4 mr-2" />
                                    Staffing
                                </Button>
                            </Link>

                            <div className="h-6 w-px bg-white/20"></div>

                            <div className="flex items-center gap-2 px-2">
                                <div className="w-8 h-8 rounded-full bg-[#ffdd59] flex items-center justify-center text-[#193153] font-bold text-xs ring-2 ring-white/10">
                                    {admin.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-blue-100">{admin.name}</span>
                            </div>

                            <Button variant="ghost" className="text-white hover:bg-red-500/20 hover:text-red-300" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#193153] mb-2">Landing Page Manager</h1>
                    <p className="text-gray-600">Manage announcements and newsroom content</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                        <TabsTrigger value="announcements">Announcements</TabsTrigger>
                        <TabsTrigger value="newsroom">Newsroom</TabsTrigger>
                    </TabsList>

                    {/* Announcements Tab */}
                    <TabsContent value="announcements">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {announcements.map((announcement) => (
                                <Card key={announcement.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 overflow-hidden bg-gray-200">
                                        <img
                                            src={announcement.image}
                                            alt={announcement.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/Dorm1.jpg';
                                            }}
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-[#193153]">{announcement.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{announcement.description}</p>
                                        <Button
                                            onClick={() => handleEditAnnouncement(announcement)}
                                            className="w-full bg-[#193153] hover:bg-[#2a4a75] text-white"
                                        >
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            Edit Announcement
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Newsroom Tab */}
                    <TabsContent value="newsroom">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {newsItems.map((newsItem) => (
                                <Card key={newsItem.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                {newsItem.category}
                                            </span>
                                            <span className="text-xs text-gray-500">{newsItem.date}</span>
                                        </div>
                                        <CardTitle className="text-xl text-[#193153]">{newsItem.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{newsItem.summary}</p>
                                        <Button
                                            onClick={() => handleEditNews(newsItem)}
                                            className="w-full bg-[#193153] hover:bg-[#2a4a75] text-white"
                                        >
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            Edit News Article
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Edit Announcement Modal */}
            {editingAnnouncementId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-2xl font-bold text-[#193153]">Edit Announcement</h3>
                            <button onClick={handleCancelAnnouncement} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Image Preview */}
                            {previewAnnouncementImage && (
                                <div className="space-y-2">
                                    <Label>Image Preview</Label>
                                    <div className="h-64 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                                        <img
                                            src={previewAnnouncementImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/Dorm1.jpg';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="image"
                                        value={announcementFormData.image || ''}
                                        onChange={(e) => handleAnnouncementImageChange(e.target.value)}
                                        placeholder="/images/your-image.jpg"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => previewAnnouncementImage && setPreviewAnnouncementImage(announcementFormData.image || '')}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Enter the path to your image (e.g., /images/announcement.jpg)
                                </p>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={announcementFormData.title || ''}
                                    onChange={(e) => setAnnouncementFormData({ ...announcementFormData, title: e.target.value })}
                                    placeholder="Announcement title"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={announcementFormData.description || ''}
                                    onChange={(e) => setAnnouncementFormData({ ...announcementFormData, description: e.target.value })}
                                    rows={4}
                                    placeholder="Announcement description"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                            <Button variant="outline" onClick={handleCancelAnnouncement}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveAnnouncement} className="bg-[#193153] hover:bg-[#2a4a75] text-white">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit News Modal */}
            {editingNewsId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-2xl font-bold text-[#193153]">Edit News Article</h3>
                            <button onClick={handleCancelNews} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="news-title">Title *</Label>
                                <Input
                                    id="news-title"
                                    value={newsFormData.title || ''}
                                    onChange={(e) => setNewsFormData({ ...newsFormData, title: e.target.value })}
                                    placeholder="News title"
                                />
                            </div>

                            {/* Date and Category Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="news-date">Date *</Label>
                                    <Input
                                        id="news-date"
                                        type="date"
                                        value={newsFormData.date || ''}
                                        onChange={(e) => setNewsFormData({ ...newsFormData, date: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="news-category">Category *</Label>
                                    <Input
                                        id="news-category"
                                        value={newsFormData.category || ''}
                                        onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                                        placeholder="e.g., Announcement, Event, Policy"
                                    />
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="space-y-2">
                                <Label htmlFor="news-summary">Summary *</Label>
                                <Textarea
                                    id="news-summary"
                                    value={newsFormData.summary || ''}
                                    onChange={(e) => setNewsFormData({ ...newsFormData, summary: e.target.value })}
                                    rows={3}
                                    placeholder="Brief summary of the news article"
                                />
                            </div>

                            {/* Full Article Content (Plain Text) */}
                            <div className="space-y-2">
                                <Label htmlFor="news-fullContent">Full Article Content</Label>
                                <Textarea
                                    id="news-fullContent"
                                    value={newsFormData.fullContent || ''}
                                    onChange={(e) => setNewsFormData({ ...newsFormData, fullContent: e.target.value })}
                                    rows={15}
                                    placeholder="Enter article content here. Use simple formatting:&#10;- Start lines with '- ' for bullet points&#10;- Use ALL CAPS for section headers&#10;- Use '---' for dividers"
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500">
                                    Write in plain text. Use "- " for bullets, ALL CAPS for headers, and "---" for dividers.
                                </p>
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-2">
                                <Label htmlFor="news-image">Article Image URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="news-image"
                                        value={newsImageUrl}
                                        onChange={(e) => setNewsImageUrl(e.target.value)}
                                        placeholder="/images/news-photo.jpg"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            if (newsImageUrl) {
                                                setNewsFormData({ ...newsFormData, image: newsImageUrl });
                                                toast.success('Image URL added to article');
                                            }
                                        }}
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Add
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Enter the path to your image (e.g., /images/news-photo.jpg)
                                </p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                            <Button variant="outline" onClick={handleCancelNews}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveNews} className="bg-[#193153] hover:bg-[#2a4a75] text-white">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
