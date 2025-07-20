import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Application } from './types';

interface ApplicationDetailsProps {
  application: Application;
  onStatusUpdate: (appId: string, newStatus: string) => void;
  onCommentAdd: (appId: string, comment: string) => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  onStatusUpdate,
  onCommentAdd
}) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onCommentAdd(application.id, newComment);
      setNewComment('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icon name="Eye" size={14} className="mr-2" />
          Детали
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Заявка #{application.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Статус</Label>
              <select 
                className="w-full mt-1 p-2 border rounded"
                value={application.status}
                onChange={(e) => onStatusUpdate(application.id, e.target.value)}
              >
                <option value="Новая">Новая</option>
                <option value="В обработке">В обработке</option>
                <option value="Одобрена">Одобрена</option>
                <option value="Отклонена">Отклонена</option>
                <option value="Выдана">Выдана</option>
              </select>
            </div>
            <div>
              <Label>Комментарии</Label>
              <div className="mt-1 max-h-32 overflow-y-auto space-y-1">
                {application.comments.map((comment, index) => (
                  <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label>Добавить комментарий</Label>
            <div className="flex gap-2 mt-1">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Введите комментарий..."
                className="flex-1"
              />
              <Button onClick={handleAddComment}>
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetails;