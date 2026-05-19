'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [today, setToday] = useState('')

  useEffect(() => {
    // Bloquear fecha anterior a hoy
    const date = new Date().toISOString().split('T')[0]
    setToday(date)

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const nombre = formData.get('nombre')
    const servicio = formData.get('servicio')
    const fecha = formData.get('fecha')
    const mensajeExtra = formData.get('mensaje') || 'Sin comentarios adicionales'

    const mensaje = `¡Hola Daruma Cuts! 🪒\n\nMi nombre es *${nombre}*.\nMe gustaría agendar para: *${servicio}*.\nFecha solicitada: *${fecha}*.\n\nNota: ${mensajeExtra}`
    
    const whatsappUrl = `https://wa.me/5492964404353?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main>
      {/* Navbar con todos los enlaces */}
    <nav className={`navbar-custom fixed-top w-100 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo y Marca */}
        <div className="d-flex align-items-center">
           <a className="navbar-brand me-2" href="#">DARUMA <span>CUTS</span></a>
           <img src="/images/logoindx.png" alt="Logo Daruma" style={{ width: '60px', height: '60px' }} />
        </div>
        
        {/* (Mobile) */}
        <button className="d-lg-none btn text-white border-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-2`}></i>
        </button>

        {/* Enlaces y Botón (Controlados por la clase 'is-open') */}
        <div className={`navbar-links d-lg-flex align-items-center ${isMenuOpen ? 'is-open' : ''}`}>
          <a className="nav-link" href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a>
          <a className="nav-link" href="#sobre-mi" onClick={() => setIsMenuOpen(false)}>Sobre Mí</a>
          <a className="nav-link" href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
          <a className="nav-link" href="#galeria" onClick={() => setIsMenuOpen(false)}>Galería</a>
          <a className="nav-link" href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
          <a href="#contacto" className="btn btn-reservar ms-lg-3 mt-3 mt-lg-0" onClick={() => setIsMenuOpen(false)}>Reservar Turno</a>
        </div>
      </div>
    </nav>

      {/* Hero*/}
      <section id="inicio" className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in text-center">

        <p className="hero-subtitle">
          <span className="subtitle-lines">—</span> 
          <span className="hero-text-mobile">BARBERÍA PREMIUM</span> 
          <span className="subtitle-lines">—</span>
        </p>
          <h1 className="hero-title">DARUMA <span>CUTS</span></h1>
          <a href="#contacto" className="btn btn-reservar btn-lg">Reservar Turno</a>
        </div>

        
      <div 
        className="scroll-indicator"
        onClick={() => {
          document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ cursor: 'pointer' }}
      >
        <i className="bi bi-chevron-double-down"></i>
      </div>
    </section>

    {/* Sobre Mi */}
    <section id="sobre-mi" className="about-section section-padding">
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/*Imagen */}
          <div className="col-lg-6 fade-in">
            <div className="about-image position-relative">
              <img src="/images/barber-profile.jpg" alt="Lucas Barria - Barbero" className="img-fluid rounded shadow" />
            </div>
          </div>

          {/* Información */}
          <div className="col-lg-6 fade-in">
            <h2 className="section-title">Sobre Mí</h2>
            <p className="section-subtitle fs-5 mb-3">
              Soy Lucas Barria, creador de <span className="fw-bold">Daruma Cuts</span>.
            </p>
            
            {/* Párrafo descriptivo para conectar con el cliente */}
            <p className="text-white-50 mb-4" style={{ lineHeight: '1.8' }}>
              Más que un simple corte de pelo, mi objetivo es ofrecer una experiencia de estilo y cuidado personal en Río Grande. Mi enfoque combina las técnicas clásicas de barbería con las tendencias urbanas más modernas, prestando máxima atención a los detalles para garantizar que cada cliente encuentre su mejor versión.
            </p>

            {/* Tus estadísticas originales, mejoradas con flexbox para que queden alineadas */}
            <div className="about-stats d-flex gap-4 mb-5 border-top border-secondary pt-4 mt-4">
              <div className="stat-item text-center">
                <div className="stat-number fs-3 fw-bold" style={{ color: 'var(--color-primary)' }}>3+</div>
                <div className="stat-label small text-white-50">Años Exp.</div>
              </div>
              <div className="stat-item text-center border-start border-secondary ps-4">
                <div className="stat-number fs-3 fw-bold" style={{ color: 'var(--color-primary)' }}>50+</div>
                <div className="stat-label small text-white-50">Clientes Fieles</div>
              </div>
              <div className="stat-item text-center border-start border-secondary ps-4">
                <div className="stat-number fs-3 fw-bold" style={{ color: 'var(--color-primary)' }}>100%</div>
                <div className="stat-label small text-white-50">Dedicación</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Mis Servicios */}
      <section id="servicios" className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-5 fade-in">
            <h2 className="section-title text-center">Mis Servicios</h2>
          </div>
          <div className="row g-4">
            {[
              { t: 'Corte Clásico' },
              { t: 'Barba Completa',  },
              { t: 'Corte + Barba', },
              { t: 'Experiencia VIP'}
            ].map((s, i) => (
              <div key={i} className="col-md-6 col-lg-3 fade-in">
                <div className="service-card text-center">
                  <div className="service-icon mx-auto"><i className={`bi ${s.i}`}></i></div>
                  <h3 className="service-title">{s.t}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="gallery-section section-padding">
        <div className="container text-center">
          <h2 className="section-title text-center">Mi Trabajo</h2>
          <div className="row g-3 mt-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="col-md-3 col-6 fade-in">
                <div className="about-image">
                   <img src={`/images/cut${n}.jpg`} className="img-fluid rounded" alt="Trabajo" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto & Horarios */}
      <section id="contacto" className="contact-section section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 fade-in">
              <h2 className="section-title">Ubicación & Horarios</h2>
              <ul className="list-unstyled mb-5">
                <li><i className="bi bi-clock  me-2"></i> Lunes - Viernes: 10:00 - 20:00</li>
                <li><i className="bi bi-clock me-2"></i> Sabados: 13:00 - 17:00</li>
                <li><i className="bi bi-geo-alt me-2"></i> Rio Grande, Tierra del Fuego</li>
              </ul>
              <div className="map-container shadow" style={{ borderRadius: '15px', height: '300px', overflow: 'hidden', border: '1px solid var(--color-primary)' }}>
                
                <div className="map-container mb-4 shadow-lg" style={{ borderRadius: '15px', height: '350px', overflow: 'hidden', border: '2px solid var(--color-primary)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4716.447408563647!2d-67.7337277225235!3d-53.76770480171692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4b1617455a0ab3%3A0x83d345f55580f670!2s10%20de%20Diciembre%201266%2C%20V9240%20R%C3%ADo%20Grande%2C%20Tierra%20del%20Fuego%2C%20Argentina!5e0!3m2!1ses!2sus!4v1774898996211!5m2!1ses!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
                  
              </div>
            </div>

            {/* Seccion Reservar*/ }
            <div className="col-lg-7 fade-in">
              <div className="bg-dark p-4 rounded-4 shadow">
                <h3 className="mb-4 text-left">Reserva tu Turno</h3>
                <form onSubmit={handleWhatsAppSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6"><input name="nombre" placeholder="Nombre" className="form-control form-control-custom" required /></div>
                    <div className="col-md-6"><input name="fecha" type="date" min={today} className="form-control form-control-custom" required /></div>
                    <div className="col-12">
                      <select name="servicio" className="form-control form-control-custom" required>
                        <option value="Corte Clásico">Corte Clásico</option>
                        <option value="Barba Completa">Barba Completa</option>
                        <option value="Corte + Barba">Corte + Barba</option>
                        <option value="Experiencia VIP">Experiencia VIP</option>
                      </select>
                    </div>
                    <div className="col-12"><textarea name="mensaje" placeholder="Mensaje opcional" className="form-control form-control-custom" rows={3}></textarea></div>
                    <button type="submit" className="btn btn-reservar btn-lg w-100 mt-4"><i className="bi bi-whatsapp"></i> Enviar a WhatsApp</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Footer */}
      <footer className="footer bg-dark pt-5 pb-3 border-top border-secondary">
        <div className="container">
          {/* Fila Principal: Marca y Redes */}
          <div className="row align-items-center mb-4">
            
            {/*Marca */}
            <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
              <span className="footer-brand">DARUMA <span>CUTS</span></span>
              <p className="small text-mt-2 mb-0">Barbería Estilo Premium.</p>
              <p className="small text">Rio Grande, Tierra del Fuego</p>
            </div>

            {/* Redes Sociales */}
            <div className="col-md-6">
              <div className="social-links d-flex justify-content-center justify-content-md-end gap-3">
                {/* diseño de los íconos */}
                <a href="https://www.instagram.com/daruma.cuts/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a href="https://www.facebook.com/lucas.barria.161" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a href="https://wa.me/5492964404353" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-whatsapp fs-5"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Línea divisoria sutil para separar el copyright */}
          <hr className="border-secondary opacity-50 mb-4" />

          {/* Copyright */}
          <div className="copy row">
            <div className="col-12 text-center">
              <p className="small text-white-50 mb-0">
                {/* Usamos JavaScript para que el año se actualice solo */}
                © {new Date().getFullYear()} <span className="text-white fw-semibold tracking-wide">Darkor Tech</span>. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
      </main>
  );
}