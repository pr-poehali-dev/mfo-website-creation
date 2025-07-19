import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.startsWith('7') || numbers.startsWith('8')) {
      const cleaned = numbers.startsWith('8') ? '7' + numbers.slice(1) : numbers;
      return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    }
    return value;
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Симуляция отправки SMS
    setTimeout(() => {
      setIsLoading(false);
      setIsCodeSent(true);
    }, 2000);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Симуляция проверки кода
    setTimeout(() => {
      setIsLoading(false);
      // Здесь будет редирект в личный кабинет
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mfo-lightgreen via-white to-mfo-yellow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-mfo-yellow to-mfo-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-3d">
            <Icon name="Banknote" size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
            Заём ФИ
          </h1>
          <p className="text-gray-600">Вход в личный кабинет</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-mfo-darkgreen to-mfo-yellow bg-clip-text text-transparent">
              {!isCodeSent ? 'Авторизация' : 'Подтверждение'}
            </CardTitle>
            <p className="text-gray-600">
              {!isCodeSent 
                ? 'Введите номер телефона для входа' 
                : 'Введите код из SMS'
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isCodeSent ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg font-semibold">
                    Номер телефона
                  </Label>
                  <div className="relative">
                    <Icon name="Phone" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mfo-green" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="pl-10 h-14 text-lg rounded-2xl border-2 border-mfo-lightgreen focus:border-mfo-green"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || phone.length < 18}
                  className="w-full bg-gradient-to-r from-mfo-yellow to-mfo-green hover:from-mfo-green hover:to-mfo-yellow text-white text-lg py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Отправляем SMS...
                    </>
                  ) : (
                    <>
                      <Icon name="MessageSquare" size={20} className="mr-2" />
                      Получить код
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-mfo-green rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                    <Icon name="MessageCircle" size={32} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Код отправлен на номер<br />
                    <span className="font-semibold text-mfo-darkgreen">{phone}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smsCode" className="text-lg font-semibold">
                    Код из SMS
                  </Label>
                  <div className="relative">
                    <Icon name="Shield" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mfo-green" />
                    <Input
                      id="smsCode"
                      type="text"
                      placeholder="1234"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="pl-10 h-14 text-lg text-center tracking-widest rounded-2xl border-2 border-mfo-lightgreen focus:border-mfo-green"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setIsCodeSent(false)}
                    className="flex-1 border-2 border-mfo-green text-mfo-darkgreen hover:bg-mfo-lightgreen rounded-2xl py-4"
                  >
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Назад
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading || smsCode.length < 4}
                    className="flex-1 bg-gradient-to-r from-mfo-yellow to-mfo-green hover:from-mfo-green hover:to-mfo-yellow text-white rounded-2xl py-4 font-bold shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={20} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <Icon name="LogIn" size={20} className="mr-2" />
                        Войти
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-mfo-darkgreen hover:text-mfo-green"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 2000);
                    }}
                  >
                    Отправить код повторно
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center text-sm text-gray-500">
              <p>Продолжая, вы соглашаетесь с</p>
              <a href="#" className="text-mfo-darkgreen hover:text-mfo-green underline">
                условиями использования
              </a>
            </div>
          </CardContent>
        </Card>

        {/* 3D Character */}
        <div className="text-center mt-8">
          <div className="relative inline-block">
            <img 
              src="/img/4273429f-4b28-42ab-9ecc-46fed76be1c6.jpg" 
              alt="Консультант поддержки" 
              className="w-32 h-32 object-cover rounded-full border-4 border-mfo-yellow shadow-2xl animate-float"
            />
            <div className="absolute -top-2 -right-2 bg-mfo-green text-white p-2 rounded-full animate-bounce">
              <Icon name="MessageCircle" size={16} />
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Нужна помощь? Наш консультант всегда готов помочь!
          </p>
        </div>
      </div>
    </div>
  );
}