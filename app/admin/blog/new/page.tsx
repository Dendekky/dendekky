import PostEditor from '../post-editor';
import DevelopmentOnly from '@/components/admin/DevelopmentOnly';

export default function NewPostPage() {
  return (
    <DevelopmentOnly>
      <div>
        <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
        <PostEditor />
      </div>
    </DevelopmentOnly>
  );
}
