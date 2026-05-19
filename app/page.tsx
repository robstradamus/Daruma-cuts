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
          <div className="d-flex align-items-center">
             <a className="navbar-brand me-2" href="#">DARUMA <span>CUTS</span></a>
             <img src="/images/logoindx.png" alt="Logo" style={{ width: '60px', height: '60px' }} />
          </div>
          
          <button className="d-lg-none btn text-white border-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-2`}></i>
          </button>

          <div className={`navbar-links d-lg-flex align-items-center ${isMenuOpen ? 'd-block' : 'd-none'}`}>
            <a className="nav-link" href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a className="nav-link" href="#sobre-mi" onClick={() => setIsMenuOpen(false)}>Sobre Mí</a>
            <a className="nav-link" href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a className="nav-link" href="#galeria" onClick={() => setIsMenuOpen(false)}>Galería</a>
            <a className="nav-link" href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            <a href="#contacto" className="btn btn-reservar ms-lg-3 mt-3 mt-lg-0">Reservar Turno</a>
          </div>
        </div>
      </nav>

      {/* Hero*/}
      <section id="inicio" className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in text-center">
          <p className="hero-subtitle">Barbería Premium</p>
          <h1 className="hero-title">DARUMA <span>CUTS</span></h1>
          <a href="#contacto" className="btn btn-reservar btn-lg">Reservar Turno</a>
        </div>
        
        {/* Seccion Scroll */}
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
          <div className="col-lg-6 fade-in">
            <div className="about-image">
              <img src="/images/barber-profile.jpg" alt="Barbero" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-6 fade-in">
            <h2 className="section-title">Sobre Mí</h2>
            <p className="section-subtitle mb-4">Soy Lucas Barria creador de Daruma Cuts, un barbero apasionado por su trabajo.</p>
            <div className="about-stats">
              <div className="stat-item"><div className="stat-number">3+</div><div className="stat-label">Años Exp.</div></div>
              <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Clientes</div></div>
              <div className="stat-item"><div className="stat-number">100%</div><div className="stat-label">Dedicación</div></div>
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
              { t: 'Corte Clásico', i: 'bi-scissors', p: '$0' },
              { t: 'Barba Completa', i: 'bi-droplet-half', p: '$0' },
              { t: 'Corte + Barba', i: 'bi-award', p: '$0' },
              { t: 'Experiencia VIP', i: 'bi-stars', p: '$0' }
            ].map((s, i) => (
              <div key={i} className="col-md-6 col-lg-3 fade-in">
                <div className="service-card text-center">
                  <div className="service-icon mx-auto"><i className={`bi ${s.i}`}></i></div>
                  <h3 className="service-title">{s.t}</h3>
                  <div className="service-price">{s.p}</div>
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
            
            {/* Izquierda: Marca */}
            <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
              <span className="footer-brand">DARUMA <span>CUTS</span></span>
              <p className="small text-muted mt-2 mb-0">Barbería Estilo Premium.</p>
              <p className="small text-muted">Rio Grande, Tierra del Fuego</p>
            </div>

            {/* Derecha : Redes Sociales */}
            <div className="col-md-6">
              <div className="social-links d-flex justify-content-center justify-content-md-end gap-3">
                {/* Agregamos rel="noopener noreferrer" por seguridad en React y mejoramos el diseño de los íconos */}
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