import { useEffect, useRef, useState } from 'react'
import hero from './assets/hero.jpg'
import tech from './assets/tech.jpg'
import ba1 from './assets/ba1.jpg'
import ba2 from './assets/ba2.jpg'
import receipt from './assets/receipt.jpg'

const PHONE = '917276110800'

const LINKS = [['services', 'Services'], ['how', 'How it works'], ['results', 'Results'], ['warranty', 'Warranty'], ['reviews', 'Reviews'], ['faq', 'FAQ']]
const MARQUEE = ['6-month warranty', 'Free pickup & drop', 'Same-day repair', 'Original-grade parts', 'All brands serviced']
const WHY = [
  ['⚡', 'Same-day repair', 'Most screen and battery jobs leave the workshop the same day.'],
  ['🛵', 'Free pickup & drop', 'Doorstep collection and return within our service area, free both ways.'],
  ['✅', 'Quality-checked parts', 'Every part is tested on the device before the phone goes back to you.'],
  ['🔍', 'Diagnosis before work', 'You see the issue and approve the quote before we open anything up.'],
  ['🔒', 'Your data stays yours', 'We work on the hardware. Your photos, chats and accounts are left alone.'],
  ['📱', 'All brands serviced', 'iPhone, Samsung, Vivo, Oppo, Realme, Redmi, OnePlus, Pixel and more.'],
]
const REVIEWS = [
  ['Rahul S.', 'Screen changed the same evening. They picked up and dropped the phone. Zero hassle.'],
  ['Sana K.', 'The receipt noting my phone’s condition at pickup gave me confidence. Battery works great.'],
  ['Imran A.', 'Quote was clear before work started. No surprise charges.'],
  ['Pooja M.', 'Phone wouldn’t charge. Port fixed within a day and delivered home.'],
]
const FAQ = [
  ['Is pickup and drop really free?', 'Yes, free both ways within our service area around Bhiwandi.'],
  ['Will my phone be repaired the same day?', 'Most screen and battery jobs are done the same day. Complex faults can take longer; we tell you upfront.'],
  ['Do you replace iPhone parts?', 'Yes. We service iPhone and all major Android brands.'],
  ['How do I know what the repair will cost?', 'We diagnose first and share an estimate. Work starts only after your approval.'],
  ['Will you look at my photos or messages?', 'No. We work only on the hardware.'],
  ['Is there a warranty?', '6 months on replaced parts. Broken glass repair is at own risk and physical damage is not covered.'],
  ['How do I book a pickup?', 'Use the form on this page, WhatsApp us, or call +91 72761 10800.'],
]

/* ---------- first-load intro ---------- */
function Intro({ onDone }) {
  const [pct, setPct] = useState(0)
  const [go, setGo] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const iv = setInterval(() => setPct((p) => Math.min(100, p + Math.random() * 7 + 3)), 80)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (pct < 100) return
    const t1 = setTimeout(() => {
      setGo(true)
      document.body.style.overflow = ''
      setTimeout(onDone, 350)
      setTimeout(() => setHidden(true), 1100)
    }, 300)
    return () => clearTimeout(t1)
  }, [pct >= 100]) // eslint-disable-line

  if (hidden) return null
  return (
    <div id="intro" className={go ? 'go' : ''}>
      <div className="c">
        <div className="bolt">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
        </div>
        <div className="t">
          {'MOBISNAP'.split('').map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.15 + i * 0.06}s` }}>{c}</span>
          ))}
        </div>
        <div className="intro-sub mono">Repairs in a flash</div>
        <div className="bar"><i style={{ width: pct + '%' }} /></div>
        <div className="intro-pct mono">Loading <b>{Math.floor(pct)}%</b></div>
      </div>
    </div>
  )
}

/* ---------- count-up number ---------- */
function Count({ to }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let c = 0
      const k = setInterval(() => { setN(++c); if (c >= to) clearInterval(k) }, 150)
      io.disconnect()
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n}</span>
}

export default function App() {
  const [live, setLive] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prog, setProg] = useState(0)
  const stepsRef = useRef(null)
  const [menu, setMenu] = useState(false)
  const closeMenu = () => setMenu(false)
  useEffect(() => { if (live) document.body.style.overflow = menu ? 'hidden' : '' }, [menu, live])

  // page becomes "live" after intro -> hero text/photo animate in
  useEffect(() => { document.body.classList.toggle('live', live) }, [live])

  // scroll-reveal for everything outside the hero
  useEffect(() => {
    const io = new IntersectionObserver((en) => {
      en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } })
    }, { threshold: 0.15 })
    document.querySelectorAll('.fade,.pic').forEach((el) => { if (!el.closest('#top')) io.observe(el) })
    return () => io.disconnect()
  }, [])

  // nav background, steps progress line, hero photo parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const r = stepsRef.current.getBoundingClientRect()
      setProg(Math.min(100, Math.max(0, ((window.innerHeight * 0.8 - r.top) / r.height) * 100)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const d = new FormData(e.target)
    const msg = `*MobiSnap pickup request*\nName: ${d.get('n')}\nMobile: ${d.get('m')}\nDevice: ${d.get('d')}\nProblem: ${d.get('q')}\nAddress: ${d.get('a')} ${d.get('p') || ''}`
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const marquee = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE]

  return (
    <>
      <Intro onDone={() => setLive(true)} />

      <nav className={scrolled ? 's' : ''}>
        <a className="logo" href="#top" onClick={closeMenu}><i>⚡</i>Mobi<b>Snap</b></a>
        <div className="l">
          {LINKS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <a className="btn p nav-cta" href="#book">Book free pickup</a>
        <button className={`burger ${menu ? 'open' : ''}`} onClick={() => setMenu(!menu)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`drawer ${menu ? 'open' : ''}`}>
        <div className="drawer-inner">
          {LINKS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={closeMenu} style={{ transitionDelay: menu ? `${0.15 + i * 0.05}s` : '0s' }}>{label}</a>
          ))}
          <a className="btn p" href="#book" onClick={closeMenu}>Book free pickup →</a>
        </div>
      </div>

      {/* HERO */}
      <div id="top" className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <div className="loc mono fade"><span className="dot" />Bhiwandi · Thane · Maharashtra 421302</div>
            <h1>
              <span className="w"><span style={{ transitionDelay: '.1s' }}>Phone broken?</span></span>
              <span className="w"><span style={{ transitionDelay: '.25s' }}>We pick up, fix &amp;</span></span>
              <span className="w ac"><span style={{ transitionDelay: '.4s' }}>drop it back today.</span></span>
            </h1>
            <p className="fade" style={{ transitionDelay: '.7s' }}>
              MobiSnap brings certified smartphone repair to your door across Bhiwandi and Dapoda. Free pickup, genuine parts, same-day turnaround. Zero hassle.
            </p>
            <div className="hero-cta fade" style={{ transitionDelay: '.85s' }}>
              <a className="btn p" href="#book">Book free pickup →</a>
              <a className="btn" href={`https://wa.me/${PHONE}`}>Chat on WhatsApp</a>
            </div>
            <div className="badges fade" style={{ transitionDelay: '1s' }}>
              <span><b>✓</b>Free doorstep pickup &amp; drop</span>
              <span><b>✓</b>Same-day express repair</span>
            </div>
            <div className="hero-stats fade" style={{ transitionDelay: '1.1s' }}>
              <div><b>6 Months</b><span className="mono">Parts warranty</span></div>
              <div><b>₹0</b><span className="mono">Pickup &amp; drop</span></div>
              <div><b>Same day</b><span className="mono">Most repairs</span></div>
            </div>
          </div>
          <div className="pic hero-image">
            <img src={hero} alt="Technician repairing an iPhone" />
            <div className="float-chip chip-1">✓ Quality-checked parts</div>
            <div className="float-chip chip-2">✓ Your data stays private</div>
            <div className="badge"><b>2 Hrs</b><span className="mono">Avg. express fix</span></div>
          </div>
        </div>
      </div>

      <div className="mq">
        <div>{marquee.map((m, i) => <span key={i}>{m}</span>)}</div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="hd">
          <h2 className="fade">Fixed right,<br /><span className="ac">the first time.</span></h2>
          <p className="fade">Quality-checked parts, tested on your device before it goes back to you. All brands serviced.</p>
        </div>
        <div className="bento">
          <div className="card big fade">
            <img src={tech} alt="Technician at the workbench" />
            <div className="tx">
              <span className="tag mono">Most booked</span>
              <h3>Screen &amp; battery replacement</h3>
              <p>Cracked display or dying battery. Most jobs leave the workshop the same day.</p>
            </div>
          </div>
          {[['⚡', 'Charging port', 'Loose, dirty or not charging. Cleaned or replaced.'],
            ['🔊', 'Speaker & mic', 'Muffled sound or dead mic, repaired or replaced.'],
            ['💧', 'Water damage', 'Honest diagnosis first. No promises we cannot keep.'],
            ['📱', 'Software & other', 'Hang, slow or boot issues and more. Ask us.']].map(([i, t, p]) => (
            <div className="card fade" key={t}><div className="ic">{i}</div><h3>{t}</h3><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ paddingTop: 20 }}>
        <div className="hd">
          <h2 className="fade">Four steps.<br /><span className="ac">Zero queues.</span></h2>
          <p className="fade">Book once. Our helper arrives with the service receipt, notes your phone’s condition and takes it to the workshop.</p>
        </div>
        <div className="steps" ref={stepsRef}>
          <div id="prog" style={{ width: prog + '%' }} />
          {[['Book', 'Fill the form or message us on WhatsApp.'],
            ['Pickup', 'Helper collects the phone and fills the service receipt with you.'],
            ['Approve & repair', 'You approve the quote first. Then we repair at our Mankoli Road workshop.'],
            ['Delivered', 'Tested phone returns to your door.']].map(([t, p], i) => (
            <div className="st fade" key={t}><div className="n">{i + 1}</div><h3>{t}</h3><p>{p}</p></div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="results">
        <div className="hd">
          <h2 className="fade">Before &amp; <span className="ac">after.</span></h2>
          <p className="fade">Every repair is finished with quality parts and a warranty.</p>
        </div>
        <div className="ba3">
          {[[ba1, 'Cracked back glass restored'], [ba2, 'Water damage display fixed']].map(([src, cap]) => (
            <div key={cap}>
              <div className="pic">
                <span className="lb l mono">Before</span><span className="lb r mono">After</span>
                <img src={src} alt={cap} />
              </div>
              <div className="cap fade">{cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section style={{ paddingTop: 20 }}>
        <div className="hd">
          <h2 className="fade">A repair shop that <span className="ac">comes to you.</span></h2>
          <p className="fade">We run a working workshop on Mankoli Road, and we bring its counter to your doorstep.</p>
        </div>
        <div className="why">
          {WHY.map(([i, t, p]) => (
            <div className="fade" key={t}><div className="ic">{i}</div><b>{t}</b><span>{p}</span></div>
          ))}
        </div>
      </section>

      {/* WARRANTY */}
      <section id="warranty">
        <div className="war">
          <div className="card fade">
            <div className="mono ac">Warranty</div>
            <div className="huge" style={{ marginTop: 14 }}><Count to={6} /></div>
            <h3 style={{ fontSize: 36, marginTop: 14 }}>months warranty on parts &amp; replacement</h3>
          </div>
          <div className="note fade">
            <div className="mono ac">Please note</div>
            <h3 style={{ fontSize: 36, margin: '12px 0' }}>Broken glass repair is at own risk.</h3>
            <p style={{ color: 'var(--mut)' }}>We take full care, but we give no warranty on physical damage such as water damage, screen breakage or a crushed body. This is printed on every service receipt.</p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews">
        <div className="hd">
          <h2 className="fade">What customers <span className="ac">say.</span></h2>
          <p className="fade">Sample reviews. Replace with real customer reviews.</p>
        </div>
        <div className="rv">
          {REVIEWS.map(([n, t]) => (
            <div className="card fade" key={n}>
              <div className="star">★★★★★</div>
              <p>“{t}”</p>
              <div className="who"><div className="av">{n[0]}</div>{n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="book">
        <div className="hd">
          <h2 className="fade">Book your <span className="ac">pickup.</span></h2>
          <p className="fade">Same details as our service receipt. Submit and your booking opens on WhatsApp, ready to send.</p>
        </div>
        <div className="bk">
          <div className="pic"><img src={receipt} alt="MobiSnap service receipt book" /></div>
          <form onSubmit={submit}>
            <label>Customer name<input name="n" required /></label>
            <label>Mobile number<input name="m" type="tel" required /></label>
            <label>Brand / model<input name="d" placeholder="e.g. Samsung A14" required /></label>
            <label>Pincode<input name="p" inputMode="numeric" /></label>
            <label className="full">Pickup address<input name="a" required /></label>
            <label className="full">Problem
              <select name="q">
                {['Screen broken', 'Battery issue', 'Charging port', 'Water damage', 'Not switching on', 'Other'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <button className="btn p full" type="submit" style={{ justifyContent: 'center' }}>Send on WhatsApp →</button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="hd">
          <h2 className="fade">Things customers <span className="ac">ask first.</span></h2>
          <p className="fade">Still unsure? Call or message us and you will get a straight answer.</p>
        </div>
        {FAQ.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </section>

      <div className="cta">
        <div>
          <div>
            <div className="mono" style={{ opacity: 0.85, marginBottom: 12 }}>Ready when you are</div>
            <h2>Book the pickup. We will do the rest.</h2>
          </div>
          <div>
            <a className="btn w2" href="#book">Book free pickup →</a>{' '}
            <a className="btn" href={`https://wa.me/${PHONE}`}>WhatsApp +91 72761 10800</a>
          </div>
        </div>
      </div>

      <footer>
        <div className="in">
          <div>
            <div className="mono ac">Call the workshop</div>
            <a className="ph2" href={`tel:+${PHONE}`}>+91 72761 10800</a>
          </div>
          <div>
            <div className="mono" style={{ opacity: 0.6 }}>Workshop address</div>
            <p className="mono" style={{ lineHeight: 2, marginTop: 12 }}>
              Patel G Mobile, Mankoli Road<br />Opposite Power House Gym, Dapoda<br />Bhiwandi 421302 · Thane · Maharashtra
            </p>
          </div>
          <div>
            <div className="mono" style={{ opacity: 0.6, marginBottom: 8 }}>Explore</div>
            <a href="#services">Services</a><a href="#how">How it works</a><a href="#faq">FAQ</a><a href="#book">Book pickup</a>
          </div>
        </div>
      </footer>

      <a className="wa" href={`https://wa.me/${PHONE}`} aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm4.400 13.600c-.2.600-1.300 1.100-1.800 1.200-.5 0-1 .2-3.200-.7-2.700-1.100-4.400-3.800-4.500-4-.1-.2-1.100-1.400-1.100-2.700s.7-1.900.9-2.200c.2-.2.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 1.900c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.6 1 1.500 1.800 2.500 2.200.3.100.4.100.6-.1l.8-.9c.2-.2.400-.2.600-.1l1.800.9c.2.100.4.200.4.300.1.200.1.700-.1 1.300z" /></svg>
      </a>
    </>
  )
}