import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [loanAmount, setLoanAmount] = useState([15000]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showCookies, setShowCookies] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    passportSeries: '',
    passportNumber: '',
    address: '',
    workplace: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Симуляция 1-минутной обработки
    setTimeout(() => {
      setIsProcessing(false);
      setIsApproved(true);
    }, 60000); // 60 секунд
  };

  const calculateMonthlyPayment = (amount: number) => {
    return Math.round(amount * 1.3); // 30% за 30 дней
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mfo-lightgreen via-white to-mfo-yellow">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
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
                <p className="text-sm text-gray-600">Быстрые займы онлайн</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#calculator" className="text-gray-700 hover:text-mfo-darkgreen transition-colors">Калькулятор</a>
              <a href="#about" className="text-gray-700 hover:text-mfo-darkgreen transition-colors">О нас</a>
              <a href="#contacts" className="text-gray-700 hover:text-mfo-darkgreen transition-colors">Контакты</a>
              <Button variant="outline" className="border-mfo-green text-mfo-darkgreen hover:bg-mfo-green hover:text-white">
                <Icon name="User" size={16} className="mr-2" />
                Личный кабинет
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent animate-slide-in">
            Быстрые займы от 1 000 до 30 000 ₽
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Получите деньги на карту за 1 минуту. Без справок и поручителей.
          </p>
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-mfo-yellow rounded-full flex items-center justify-center mx-auto mb-2 animate-float">
                <Icon name="Clock" size={32} className="text-white" />
              </div>
              <p className="font-semibold">1 минута</p>
              <p className="text-sm text-gray-600">на рассмотрение</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mfo-green rounded-full flex items-center justify-center mx-auto mb-2 animate-float" style={{ animationDelay: '1s' }}>
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <p className="font-semibold">Безопасно</p>
              <p className="text-sm text-gray-600">данные защищены</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mfo-darkgreen rounded-full flex items-center justify-center mx-auto mb-2 animate-float" style={{ animationDelay: '2s' }}>
                <Icon name="CreditCard" size={32} className="text-white" />
              </div>
              <p className="font-semibold">На карту</p>
              <p className="text-sm text-gray-600">любого банка</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Calculator */}
      <section id="calculator" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 transform perspective-1000 animate-pulse-3d rounded-3xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
                Калькулятор займа
              </CardTitle>
              <p className="text-gray-600">Рассчитайте сумму к возврату</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Сумма займа: {loanAmount[0].toLocaleString()} ₽</Label>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  max={30000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 000 ₽</span>
                  <span>30 000 ₽</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Срок займа:</span>
                    <Badge variant="secondary" className="bg-mfo-green text-white">30 дней</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Процентная ставка:</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>К возврату:</span>
                    <span className="text-mfo-darkgreen">{calculateMonthlyPayment(loanAmount[0]).toLocaleString()} ₽</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-mfo-yellow to-mfo-green rounded-2xl text-white">
                    <Icon name="TrendingUp" size={48} className="mx-auto mb-2" />
                    <p className="text-sm">Переплата</p>
                    <p className="text-2xl font-bold">{(calculateMonthlyPayment(loanAmount[0]) - loanAmount[0]).toLocaleString()} ₽</p>
                  </div>
                </div>
              </div>

              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-mfo-yellow to-mfo-green hover:from-mfo-green hover:to-mfo-yellow text-white text-lg py-6 transform transition-all duration-300 hover:scale-105 shadow-lg rounded-2xl">
                    <Icon name="FileText" size={20} className="mr-2" />
                    Подать заявку на {loanAmount[0].toLocaleString()} ₽
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
                  {!isProcessing && !isApproved ? (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-center bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
                          Анкета на займ
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="lastName">Фамилия</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="firstName">Имя</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="middleName">Отчество</Label>
                            <Input
                              id="middleName"
                              value={formData.middleName}
                              onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="birthDate">Дата рождения</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="passportSeries">Серия паспорта</Label>
                            <Input
                              id="passportSeries"
                              placeholder="1234"
                              value={formData.passportSeries}
                              onChange={(e) => setFormData({...formData, passportSeries: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="passportNumber">Номер паспорта</Label>
                            <Input
                              id="passportNumber"
                              placeholder="567890"
                              value={formData.passportNumber}
                              onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address">Адрес регистрации</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="workplace">Место работы</Label>
                          <Input
                            id="workplace"
                            value={formData.workplace}
                            onChange={(e) => setFormData({...formData, workplace: e.target.value})}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-mfo-yellow to-mfo-green text-white rounded-2xl">
                          Отправить заявку
                        </Button>
                      </form>
                    </>
                  ) : isProcessing ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-r from-mfo-yellow to-mfo-green rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                        <Icon name="Loader2" size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Рассматриваем заявку...</h3>
                      <p className="text-gray-600">Это займет не более 1 минуты</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-mfo-green rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="CheckCircle" size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-mfo-darkgreen mb-4">Заявка одобрена!</h3>
                      <div className="space-y-2 mb-6">
                        <p><span className="font-semibold">Сумма:</span> {loanAmount[0].toLocaleString()} ₽</p>
                        <p><span className="font-semibold">Срок:</span> 30 дней</p>
                        <p><span className="font-semibold">Номер договора:</span> ЗФИ-{Math.random().toString().substr(2, 8)}</p>
                      </div>
                      <Button onClick={() => setIsFormOpen(false)} className="bg-mfo-green text-white rounded-2xl">
                        Закрыть
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mfo-darkgreen text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-mfo-yellow rounded-full flex items-center justify-center">
                  <Icon name="Banknote" size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Заём ФИ</h3>
              </div>
              <p className="text-gray-300">Быстрые займы онлайн без справок и поручителей</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <p className="text-gray-300">Email: viktormajorov774@gmail.com</p>
              <p className="text-gray-300">Работаем круглосуточно</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <p className="text-gray-300">Лицензия: ЗФИ-001</p>
              <p className="text-gray-300">© 2024 Заём ФИ. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      {showCookies && (
        <div className="fixed bottom-4 left-4 right-4 bg-white shadow-lg rounded-2xl p-4 z-50 border border-mfo-green">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <p className="text-sm">
                Мы используем куки для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setShowCookies(false)}>
                Отклонить
              </Button>
              <Button size="sm" className="bg-mfo-green text-white rounded-xl" onClick={() => setShowCookies(false)}>
                Принять
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}