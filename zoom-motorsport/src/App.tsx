import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, MapPin, Phone, Facebook, Youtube, ChevronLeft, ChevronRight, Camera, Video, Monitor } from 'lucide-react';

// --- TIPOS DE DADOS ---
interface PortfolioItem {
  id: number;
  category: string;
  title: string;
  image: string;
}

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const App: React.FC = () => {
  // Navegação: 'home', 'sobre', 'galeria', 'servicos', 'contactos'
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado do Carrossel 3D (Home)
  const [activeIndex, setActiveIndex] = useState(1);

  // Scroll apenas para mudar a cor do menu
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- DADOS ---
  const portfolioItems: PortfolioItem[] = [
    { id: 1, category: '', title: 'O Salto', image: '/images/Site54.png' },
    { id: 2, category: '', title: 'Grelha', image: '/images/ZM_TGRCP_AIA_CPV_203.jpg' },
    { id: 3, category: '', title: 'Pit Lane', image: '/images/pitstop.jpg' },
    { id: 4, category: '', title: 'Engenharia', image: '/images/engenharia.jpg' },
    { id: 5, category: '', title: 'A Vitória', image: '/images/podio.jpg' },
    { id: 6, category: '', title: 'Lendas', image: '/images/classico.jpg' },
    { id: 7, category: '', title: 'Foco', image: '/images/ZOM_7931.jpg' },
  ];

  const services: ServiceItem[] = [
    { id: 1, title: 'Fotografia', desc: 'Cobertura de ralis e pista.', icon: <Camera size={32}/> },
    { id: 2, title: 'Vídeo', desc: 'Highlights e reels.', icon: <Video size={32}/> },
    { id: 3, title: 'Media', desc: 'Gestão de redes sociais.', icon: <Monitor size={32}/> },
  ];

  // --- FUNÇÕES ---
  const nextSlide = () => setActiveIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setActiveIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Estilo do Carrossel 3D
  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;
    if (offset > 2) offset -= portfolioItems.length;
    if (offset < -2) offset += portfolioItems.length;

    const baseStyle = "absolute top-0 left-0 w-full h-full transition-all duration-700 cubic-bezier(0.25, 0.8, 0.25, 1) shadow-2xl bg-neutral-900 border border-neutral-800 overflow-hidden";
    
    if (offset === 0) return { className: `${baseStyle} z-30 opacity-100 shadow-[0_0_50px_-12px_rgba(220,38,38,0.3)]`, style: { transform: 'translateX(0%) scale(1) rotateY(0deg)' } };
    else if (offset === -1) return { className: `${baseStyle} z-20 opacity-40 grayscale hover:opacity-60 cursor-pointer`, style: { transform: 'translateX(-55%) scale(0.85) rotateY(20deg)' } };
    else if (offset === 1) return { className: `${baseStyle} z-20 opacity-40 grayscale hover:opacity-60 cursor-pointer`, style: { transform: 'translateX(55%) scale(0.85) rotateY(-20deg)' } };
    else return { className: `${baseStyle} z-10 opacity-0 pointer-events-none`, style: { transform: 'scale(0.5)' } };
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-red-600 selection:text-white flex flex-col overflow-x-hidden">
      
      {/* --- MENU COM LOGO AO CENTRO (DESIGN PRESERVADO) --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-neutral-950/95 backdrop-blur-md border-neutral-800 py-2' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center relative">
            
            {/* Esquerda - Links */}
            <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.2em] uppercase flex-1 text-neutral-400">
              <button onClick={() => navigateTo('home')} className={`hover:text-white transition-colors ${currentPage === 'home' ? 'text-white' : ''}`}>Início</button>
              <button onClick={() => navigateTo('sobre')} className={`hover:text-white transition-colors ${currentPage === 'sobre' ? 'text-white' : ''}`}>Sobre</button>
              <button onClick={() => navigateTo('galeria')} className={`hover:text-white transition-colors ${currentPage === 'galeria' ? 'text-white' : ''}`}>Galeria</button>
            </div>

            {/* CENTRO - LOGO PEQUENO (Para navegação) */}
            <div className="flex-shrink-0 mx-4 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="flex flex-col items-center group opacity-90 hover:opacity-100 transition-opacity">
                <img 
                  src="/images/logo Zoom copiar.png" 
                  alt="Zoom" 
                  className="h-10 md:h-12 w-auto object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>

            {/* Direita - Links e Botão */}
            <div className="hidden md:flex items-center justify-end gap-8 text-xs font-bold tracking-[0.2em] uppercase flex-1">
              <button onClick={() => navigateTo('servicos')} className={`text-neutral-400 hover:text-white transition-colors ${currentPage === 'servicos' ? 'text-white' : ''}`}>Serviços</button>
              <button onClick={() => navigateTo('contactos')} className="px-6 py-2 border border-neutral-700 text-white hover:border-red-600 hover:bg-red-600/10 hover:text-red-500 transition-all duration-300">
                Contactar
              </button>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white absolute right-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center gap-8 text-xl font-bold uppercase tracking-widest md:hidden">
          <button onClick={() => navigateTo('home')}>Início</button>
          <button onClick={() => navigateTo('sobre')}>Sobre</button>
          <button onClick={() => navigateTo('galeria')}>Galeria</button>
          <button onClick={() => navigateTo('servicos')}>Serviços</button>
          <button onClick={() => navigateTo('contactos')} className="text-red-600">Contactar</button>
        </div>
      )}

      {/* --- ÁREA PRINCIPAL (Muda conforme a Aba) --- */}
      <main className="flex-grow pt-24 min-h-screen flex flex-col">

        {/* === ABA: INÍCIO (Carrossel 3D + Logo Grande) === */}
        {currentPage === 'home' && (
          <div className="flex-grow flex flex-col justify-center items-center relative overflow-hidden pb-20">
            {/* Fundo Grelha Discreta */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            {/* Carrossel 3D */}
            <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 z-10">
              <button onClick={prevSlide} className="absolute left-4 z-50 p-2 md:p-4 text-neutral-500 hover:text-white hover:scale-110 transition-all"><ChevronLeft size={40} /></button>
              
              <div className="relative w-full md:w-[60%] h-full flex justify-center items-center perspective-1000">
                {portfolioItems.map((item, index) => {
                  const { className, style } = getCardStyle(index);
                  return (
                    <div key={item.id} className={className} style={style} onClick={() => setActiveIndex(index)}>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      {index === activeIndex && (
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 pt-20">
                          <span className="text-red-600 text-xs font-bold uppercase tracking-widest">{item.category}</span>
                          <h3 className="text-white text-2xl font-black italic uppercase">{item.title}</h3>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button onClick={nextSlide} className="absolute right-4 z-50 p-2 md:p-4 text-neutral-500 hover:text-white hover:scale-110 transition-all"><ChevronRight size={40} /></button>
            </div>
          </div>
        )}

          {/* === ABA: SOBRE === */}
        {currentPage === 'sobre' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in-up">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-lg font-bold text-white mb-10 uppercase tracking-widest flex items-center">
                  <span className="w-8 h-[2px] bg-red-600 mr-3"></span>
                  ZOOM MOTORSPORT®
                </h2>

                <div className="space-y-10 text-neutral-400 leading-relaxed text-sm">
          <p className="text-justify">
            Fundada em 2013, a Zoom Motorsport® nasceu da paixão pelas pistas e da necessidade de transformar a velocidade em arte visual. Sediada no Porto, somos hoje uma agência fotográfica e de comunicação líder, focada exclusivamente no setor automobilístico.
          </p>

          <section>
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-3 flex items-center">
              <span className="w-8 h-[2px] bg-red-600 mr-3"></span>
              A Nossa Missão
            </h3>
            <p className="text-justify border-l-2 border-neutral-800 pl-4">
              Elevar o padrão da comunicação visual no desporto motorizado. Acreditamos que cada curva e cada vitória merecem ser imortalizadas com rigor técnico. Não apenas captamos momentos; construímos o legado visual de quem confia no nosso olhar.
            </p>
          </section>

          <section>
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-3 flex items-center">
              <span className="w-8 h-[2px] bg-red-600 mr-3"></span>
              O Olhar de Quem Conhece a Pista
            </h3>
            <p className="text-justify border-l-2 border-neutral-800 pl-4">
              Presentes nos principais circuitos nacionais e internacionais, utilizamos tecnologia de ponta para entregar conteúdos que potencializam a visibilidade de pilotos e equipas perante patrocinadores e fortalecem a identidade de marcas do setor.
            </p>
          </section>

          <section>
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-3 flex items-center">
              <span className="w-8 h-[2px] bg-red-600 mr-3"></span>
              Comunicação 360º
            </h3>
            <div className="grid grid-cols-1 gap-2 border-l-2 border-neutral-800 pl-4 italic">
              <span>• Gestão de Imagem Estratégica</span>
              <span>• Assessoria de Imprensa Especializada</span>
              <span>• Digital & Social Media Performance</span>
            </div>
          </section>
        </div>
      </div>
              <div className="relative">
                <div className="absolute inset-0 border-2 border-red-600 translate-x-4 translate-y-4 -z-10"></div>
                <img src="/images/ZM_TGRCP_AIA_CPV_203.jpg" alt="Equipa Zoom" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl" />
              </div>
            </div>
          </div>
        )}

        {/* === ABA: GALERIA (Grid) === */}
        {currentPage === 'galeria' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in-up">
            <h2 className="text-4xl font-black text-white mb-12 italic uppercase text-center">Portfólio <span className="text-red-600">Completo</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {portfolioItems.map((item) => (
                <div key={item.id} className="group relative aspect-square bg-neutral-900 overflow-hidden cursor-pointer">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="text-white text-xs font-bold uppercase tracking-widest bg-red-600 px-2 py-1">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ABA: SERVIÇOS === */}
        {currentPage === 'servicos' && (
          <div className="container mx-auto px-6 py-12 animate-fade-in-up flex flex-col justify-center flex-grow">
            <h2 className="text-4xl font-black text-white mb-16 italic uppercase text-center">O Que <span className="text-red-600">Fazemos</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-neutral-900 border border-neutral-800 p-8 hover:border-red-600 transition-colors group relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4 uppercase">{service.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                  </div>
                  {/* Imagem de fundo subtil no card */}
                  <img src="/images/Site54.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity z-0" alt="" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ABA: CONTACTAR (Design Original Restaurado) === */}
        {currentPage === 'contactos' && (
          <div className="flex-grow bg-neutral-900 border-t border-neutral-800 flex items-center animate-fade-in-up">
            <div className="container mx-auto px-6 py-12">
              <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Esquerda: Info (Design Original) */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-2 mb-8">
                    <img src="/images/logo Zoom copiar.png" alt="Zoom" className="h-8 w-auto" />
                  </div>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    Media e Fotografia especializada em desportos motorizados. Sediada no Porto, disponível globalmente.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 text-neutral-300 group">
                      <div className="bg-neutral-800 p-3 rounded text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm uppercase">Sede</h5>
                        <p className="text-sm text-neutral-400">Rua Ramalho Ortigão, nº34<br/>4000-407 Porto</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-neutral-300 group">
                       <div className="bg-neutral-800 p-3 rounded text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm uppercase">Telefone</h5>
                        <p className="text-sm text-neutral-400">+351 910 086 571</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-neutral-300 group">
                       <div className="bg-neutral-800 p-3 rounded text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm uppercase">Email</h5>
                        <p className="text-sm text-neutral-400">geral@zoommotorsport.pt</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direita: Formulário (Design Original) */}
                <div className="lg:w-2/3 bg-neutral-950 p-8 lg:p-12 border border-neutral-800 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 uppercase italic">Fale Connosco</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Nome</label>
                        <input type="text" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors placeholder-neutral-700" placeholder="O seu nome" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Email</label>
                        <input type="email" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors placeholder-neutral-700" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Mensagem</label>
                      <textarea rows={4} className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors placeholder-neutral-700 resize-none" placeholder="Detalhes do projeto..."></textarea>
                    </div>
                    <button className="bg-red-600 text-white font-black uppercase tracking-widest py-4 px-8 w-full md:w-auto hover:bg-white hover:text-red-600 transition-all skew-x-[-10deg]">
                      <span className="skew-x-[10deg] inline-block">Enviar Pedido</span>
                    </button>
                  </form>
                </div>
              </div>

              <div className="border-t border-neutral-800 py-8 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-xs uppercase tracking-wider mt-8">
                <p>&copy; 2025 Zoom Motorsport.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-red-600 transition-colors"><Facebook size={18} /></a>
                  <a href="#" className="hover:text-red-600 transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="hover:text-red-600 transition-colors"><Youtube size={18} /></a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;