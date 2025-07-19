import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Application {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  date: string;
  contractNumber?: string;
  dueDate?: string;
  remainingAmount?: number;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  isVerified: boolean;
  photo?: string;
  inn?: string;
}

export default function Dashboard() {
  const [user] = useState<UserProfile>({
    firstName: 'Александр',
    lastName: 'Петров',
    middleName: 'Сергеевич',
    phone: '+7 (999) 123-45-67',
    email: 'petrov@example.com',
    isVerified: false
  });

  const [applications] = useState<Application[]>([
    {
      id: 'ЗФИ-12345678',
      amount: 15000,
      status: 'approved',
      date: '2024-01-15',
      contractNumber: 'ЗФИ-12345678',
      dueDate: '2024-02-14',
      remainingAmount: 19500
    },
    {
      id: 'ЗФИ-87654321',
      amount: 25000,
      status: 'pending',
      date: '2024-01-18'
    }
  ]);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [innFile, setInnFile] = useState<File | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-mfo-green text-white';
      case 'pending': return 'bg-mfo-yellow text-black';
      case 'rejected': return 'bg-red-500 text-white';
      case 'active': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-300 text-black';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Одобрено';
      case 'pending': return 'На рассмотрении';
      case 'rejected': return 'Отклонено';
      case 'active': return 'Активный';
      case 'completed': return 'Завершен';
      default: return 'Неизвестно';
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
    }
  };

  const handleInnUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInnFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mfo-lightgreen via-white to-mfo-yellow">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-mfo-yellow to-mfo-green rounded-full flex items-center justify-center animate-pulse-3d">
                <Icon name="Banknote" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
                  Заём ФИ
                </h1>
                <p className="text-sm text-gray-600">Личный кабинет</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              <Button variant="outline" className="border-mfo-green text-mfo-darkgreen">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="applications" className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Заявки</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <Icon name="FolderOpen" size={16} />
              <span>Документы</span>
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Верификация</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} />
              <span>Поддержка</span>
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="grid gap-6">
              {applications.map((app) => (
                <Card key={app.id} className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border-0">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Заявка #{app.id}</CardTitle>
                      <p className="text-gray-600">от {new Date(app.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {getStatusText(app.status)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">Сумма займа</Label>
                        <p className="text-2xl font-bold text-mfo-darkgreen">{app.amount.toLocaleString()} ₽</p>
                      </div>
                      {app.contractNumber && (
                        <div>
                          <Label className="text-sm text-gray-600">Номер договора</Label>
                          <p className="font-semibold">{app.contractNumber}</p>
                        </div>
                      )}
                      {app.dueDate && (
                        <div>
                          <Label className="text-sm text-gray-600">Дата возврата</Label>
                          <p className="font-semibold">{new Date(app.dueDate).toLocaleDateString('ru-RU')}</p>
                        </div>
                      )}
                    </div>
                    
                    {app.status === 'approved' && app.remainingAmount && (
                      <div className="space-y-3">
                        <Separator />
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-sm text-gray-600">К возврату</Label>
                            <p className="text-xl font-bold text-red-600">{app.remainingAmount.toLocaleString()} ₽</p>
                          </div>
                          <Button className="bg-mfo-green text-white rounded-2xl">
                            <Icon name="CreditCard" size={16} className="mr-2" />
                            Погасить
                          </Button>
                        </div>
                        <Progress value={75} className="w-full" />
                        <p className="text-sm text-gray-600">Осталось 7 дней до погашения</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
                  3D Документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-gradient-to-br from-mfo-yellow to-mfo-green p-6 rounded-3xl text-white cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl">
                        <div className="text-center">
                          <Icon name="FileText" size={48} className="mx-auto mb-4 animate-float" />
                          <h3 className="text-xl font-bold mb-2">Договор займа</h3>
                          <p className="opacity-90">ЗФИ-12345678</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Договор займа ЗФИ-12345678</DialogTitle>
                      </DialogHeader>
                      <div className="bg-white p-8 rounded-2xl shadow-inner">
                        <div className="text-center mb-6">
                          <h2 className="text-xl font-bold">ДОГОВОР ЗАЙМА</h2>
                          <p className="text-gray-600">№ ЗФИ-12345678 от 15 января 2024 г.</p>
                        </div>
                        <div className="space-y-4 text-sm">
                          <p><strong>Заимодавец:</strong> ООО "Заём ФИ"</p>
                          <p><strong>Заемщик:</strong> {user.lastName} {user.firstName} {user.middleName}</p>
                          <p><strong>Сумма займа:</strong> 15 000 (Пятнадцать тысяч) рублей</p>
                          <p><strong>Срок возврата:</strong> 30 дней</p>
                          <p><strong>Процентная ставка:</strong> 30% годовых</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="bg-gradient-to-br from-mfo-green to-mfo-darkgreen p-6 rounded-3xl text-white transform transition-all duration-300 hover:scale-105 shadow-xl">
                    <div className="text-center">
                      <Icon name="Download" size={48} className="mx-auto mb-4 animate-float" style={{ animationDelay: '1s' }} />
                      <h3 className="text-xl font-bold mb-2">График платежей</h3>
                      <p className="opacity-90">PDF документ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
                  Верификация личности
                </CardTitle>
                <div className="text-center">
                  {user.isVerified ? (
                    <Badge className="bg-mfo-green text-white">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Верифицирован
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-mfo-yellow text-mfo-darkgreen">
                      <Icon name="AlertCircle" size={16} className="mr-2" />
                      Требуется верификация
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Photo Upload */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Фото для верификации</Label>
                    <div className="border-2 border-dashed border-mfo-green rounded-2xl p-6 text-center">
                      {photoFile ? (
                        <div className="space-y-2">
                          <Icon name="CheckCircle" size={48} className="mx-auto text-mfo-green" />
                          <p className="font-semibold text-mfo-darkgreen">{photoFile.name}</p>
                          <Button
                            variant="outline"
                            onClick={() => setPhotoFile(null)}
                            className="border-red-300 text-red-600"
                          >
                            Удалить
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Icon name="Camera" size={48} className="mx-auto text-mfo-green animate-float" />
                          <div>
                            <p className="font-semibold mb-2">Загрузите селфи с паспортом</p>
                            <p className="text-sm text-gray-600 mb-4">Форматы: JPG, PNG (макс. 5MB)</p>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                              id="photo-upload"
                            />
                            <Label
                              htmlFor="photo-upload"
                              className="bg-mfo-yellow text-white px-6 py-3 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all"
                            >
                              Выбрать файл
                            </Label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* INN Upload */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Справка о доходах / ИНН</Label>
                    <div className="border-2 border-dashed border-mfo-green rounded-2xl p-6 text-center">
                      {innFile ? (
                        <div className="space-y-2">
                          <Icon name="CheckCircle" size={48} className="mx-auto text-mfo-green" />
                          <p className="font-semibold text-mfo-darkgreen">{innFile.name}</p>
                          <Button
                            variant="outline"
                            onClick={() => setInnFile(null)}
                            className="border-red-300 text-red-600"
                          >
                            Удалить
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Icon name="FileText" size={48} className="mx-auto text-mfo-green animate-float" style={{ animationDelay: '0.5s' }} />
                          <div>
                            <p className="font-semibold mb-2">Загрузите справку о доходах</p>
                            <p className="text-sm text-gray-600 mb-4">Форматы: PDF, JPG, PNG (макс. 10MB)</p>
                            <Input
                              type="file"
                              accept=".pdf,image/*"
                              onChange={handleInnUpload}
                              className="hidden"
                              id="inn-upload"
                            />
                            <Label
                              htmlFor="inn-upload"
                              className="bg-mfo-green text-white px-6 py-3 rounded-2xl cursor-pointer hover:bg-opacity-90 transition-all"
                            >
                              Выбрать файл
                            </Label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {(photoFile || innFile) && (
                  <div className="text-center">
                    <Button className="bg-gradient-to-r from-mfo-yellow to-mfo-green text-white px-8 py-4 text-lg rounded-2xl">
                      <Icon name="Upload" size={20} className="mr-2" />
                      Отправить на проверку
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
                  Поддержка клиентов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-mfo-yellow to-mfo-green p-6 rounded-3xl text-white transform transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-4 animate-float" />
                      <h3 className="text-xl font-bold mb-2">Онлайн чат</h3>
                      <p className="opacity-90">Быстрые ответы 24/7</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-mfo-green to-mfo-darkgreen p-6 rounded-3xl text-white transform transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer">
                    <div className="text-center">
                      <Icon name="Phone" size={48} className="mx-auto mb-4 animate-float" style={{ animationDelay: '1s' }} />
                      <h3 className="text-xl font-bold mb-2">Телефон</h3>
                      <p className="opacity-90">8-800-555-0123</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold mb-4">Часто задаваемые вопросы</h4>
                  <div className="space-y-3">
                    <details className="cursor-pointer">
                      <summary className="font-medium text-mfo-darkgreen">Как продлить займ?</summary>
                      <p className="mt-2 text-gray-600">Вы можете продлить займ через личный кабинет за 24 часа до окончания срока.</p>
                    </details>
                    <details className="cursor-pointer">
                      <summary className="font-medium text-mfo-darkgreen">Как досрочно погасить займ?</summary>
                      <p className="mt-2 text-gray-600">Досрочное погашение доступно в любой момент без комиссий.</p>
                    </details>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}