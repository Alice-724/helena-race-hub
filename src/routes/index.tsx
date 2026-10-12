import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Download, Flag, GraduationCap, Linkedin, Mail, Menu, Music2, Play, ShieldCheck, X, ChartNoAxesCombined } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { StudentDemo } from '@/components/student-demo';
import heroImage from '@/assets/racing-hero.jpg';
import cockpitImage from '@/assets/racing-cockpit.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Alice Helena | Code. Data. Motorsport.' },
    { name: 'description', content: 'Alice Helena, B.Sc. Computer Science student at Bishop Heber College. Explore interactive coding projects, creative work and a passion for motorsport telemetry.' },
    { property: 'og:title', content: 'Alice Helena | Code. Data. Motorsport.' },
    { property: 'og:description', content: 'Computer science meets racing. Explore Alice Helena’s projects, skills and journey toward motorsport telemetry analysis.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
const linkedin = 'https://www.linkedin.com/in/alice-helena-48b137421?utm_source=share_via&utm_content=profile&utm_medium=member_android';
const appUrl = 'https://alice-724.github.io/Brunplayer7/';
function Index() {
  const [project, setProject] = useState<'student' | 'app' | null>(null);
  const [menu, setMenu] = useState(false);
  return <>
    <header className="site-header sticky top-0 z-30"><div className="container-wide flex h-full items-center justify-between">
      <a href="#home" className="wordmark" aria-label="Alice Helena home">ALICE<span>.</span></a>
      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">{['About', 'Projects', 'Skills', 'Contact'].map(n => <a key={n} href={`#${n.toLowerCase()}`} className="nav-link">{n}</a>)}</nav>
      <div className="flex items-center gap-2"><Button asChild variant="pitlane" size="sm"><a href="/documents/alice-helena-resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight /></a></Button><Button className="md:hidden" variant="ghost" size="icon" aria-label={menu ? 'Close navigation' : 'Open navigation'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
    </div>{menu && <nav className="md:hidden bg-background border-b border-border flex justify-around py-5" aria-label="Mobile navigation">{['About','Projects','Skills','Contact'].map(n => <a className="nav-link" key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenu(false)}>{n}</a>)}</nav>}</header>
    <main>
      <section id="home" className="hero">
        <img className="hero-image" src={heroImage} alt="Red open-wheel racing car on a mountain circuit at sunset" width={1920} height={1024} fetchPriority="high" />
        <div className="container-wide hero-content"><div className="technical flex items-center gap-3 text-muted-foreground"><span className="status-dot" /> Computer science student / 2026–2029</div>
          <h1>ALICE<br /><span>HELENA.</span></h1>
          <p className="hero-intro"><strong>Code. Data. Motorsport.</strong><br />Building with curiosity. Thinking in data.<br />Driven by the world of racing.</p>
          <div className="flex flex-wrap gap-3 mt-8"><Button asChild variant="racing" size="lg"><a href="#projects">Explore my projects <ArrowDownRight /></a></Button><Button asChild variant="pitlane" size="lg"><a href="mailto:helenaalice725@gmail.com">Let's connect <ArrowUpRight /></a></Button></div>
          <a href="#about" className="inline-flex items-center gap-3 technical text-muted-foreground mt-12"><ArrowDown size={13} /> The story behind the drive</a>
        </div>
        <div className="hero-coordinate technical"><div className="flex justify-end gap-2 items-center mb-2"><Flag size={12} /> Trichy, India</div><span className="text-muted-foreground">10.7905° N / 78.7047° E</span></div>
      </section>
      <div className="skill-strip"><div className="container-wide skill-strip-inner">{['PYTHON', 'C / C++', 'SQL', 'DATA ANALYSIS', 'MOTORSPORT', 'CYBERSECURITY'].map((s,i) => <span key={s} className="flex items-center gap-7">{i > 0 && <i />}{s}</span>)}</div></div>
      <section id="about" className="section"><div className="container-wide about-grid">
        <div><div className="technical section-kicker">01 / Behind the wheel</div><h2 className="section-title">A curious mind.<br /><span>A racing heart.</span></h2><img className="racing-photo" src={cockpitImage} alt="Racing cockpit with a telemetry display and steering wheel" loading="lazy" width={1280} height={1024} /><div className="technical text-muted-foreground mt-3 flex justify-between"><span>Where technology meets the track</span><span>01 / AH</span></div></div>
        <div className="about-copy"><p>I'm Alice, a <strong>B.Sc. Computer Science student at Bishop Heber College</strong>, exploring the intersection of code, data and the things that move us.</p><p>My ambition is to become a <strong>Telemetry Data Analyst in motorsports</strong>. I'm fascinated by the stories hidden in racing data, from braking points and cornering speeds to the tiny decisions that make a faster lap.</p><p>I enjoy bringing ideas to life through games and applications, while building my skills in Python, C++, C, SQL, AWS and HTML. Cybersecurity is another area I'm exploring, especially systems, networks and protecting data.</p><p>Creativity is part of my process too. I love <strong>editing and designing</strong>, following the technology behind racing, and learning Italian and Latin. For me, there is always another skill to discover and another challenge worth taking on.</p>
          <div className="education-line flex gap-4"><GraduationCap className="text-primary shrink-0" size={22} /><div><p className="mb-1! text-foreground!">Bishop Heber College</p><div className="technical text-muted-foreground">B.Sc. Computer Science / 2026–2029</div></div></div>
          <div className="interest-tags">{['Motorsport telemetry', 'Game development', 'Cybersecurity', 'Editing & design'].map(t => <span key={t}>{t}</span>)}</div>
        </div>
      </div></section>
      <section id="projects" className="section"><div className="container-wide"><div className="flex items-end justify-between gap-5"><div><div className="technical section-kicker">02 / The project garage</div><h2 className="section-title">Built to <span>be explored.</span></h2></div><span className="technical text-muted-foreground hidden sm:block">Selected work / 02</span></div>
        <div className="project-grid">
          <article className="project-card"><div className="project-visual"><span className="project-label technical">01 / C programming</span><div className="terminal-preview"><div className="terminal-dots"><span /><span /><span /></div><strong>$ ./student_management</strong><br />=================================<br />&nbsp; STUDENT MANAGEMENT SYSTEM<br />=================================<br /><span className="prompt">&gt;</span> Registration · Attendance · Marks<br /><span className="prompt">&gt;</span> Your next input awaits<span className="text-primary">_</span></div></div><div className="project-info"><h3>Student Management System</h3><p>A menu-driven C application for managing student profiles, courses, attendance and academic results.</p><div className="project-tools technical"><span>C</span><span>Structures</span><span>File handling</span></div><div className="flex justify-between gap-2"><Button variant="racing" onClick={() => setProject('student')}><Play /> Try live demo</Button><Button variant="ghost" onClick={() => setProject('student')}>View project <ArrowUpRight /></Button></div></div></article>
          <article className="project-card"><div className="project-visual"><span className="project-label technical">02 / App development</span><div className="music-preview"><div className="music-cover"><Music2 strokeWidth={1} /></div><div><div className="music-title">Brunplayer7<span className="text-primary">.</span></div><div className="technical text-muted-foreground">Your music. Your loop.</div><div className="music-wave mt-5">{Array.from({length: 16},(_,i) => <i key={i} />)}</div></div></div></div><div className="project-info"><h3>Brunplayer7</h3><p>An interactive music player app. A space for playlists, discovering tracks and making every listen your own.</p><div className="project-tools technical"><span>Web app</span><span>Music player</span><span>UI design</span></div><div className="flex justify-between gap-2"><Button variant="racing" onClick={() => setProject('app')}><Play /> Open app</Button><Button variant="ghost" asChild><a href={appUrl} target="_blank" rel="noreferrer">Visit live site <ArrowUpRight /></a></Button></div></div></article>
        </div>
      </div></section>
      <section id="skills" className="section"><div className="container-wide"><div className="technical section-kicker">03 / Under the hood</div><h2 className="section-title">My growing <span>toolkit.</span></h2><div className="skills-grid"><div className="skill-group"><Code2 size={25} /><h3>Programming & building</h3><p>C · C++ · Python · SQL<br />HTML · CSS · AWS<br />Data structures & problem solving</p></div><div className="skill-group"><ChartNoAxesCombined size={25} /><h3>Data & motorsport</h3><p>Data-driven thinking<br />Telemetry & performance analysis interests<br />Automotive & racing technology</p></div><div className="skill-group"><ShieldCheck size={25} /><h3>Security & creativity</h3><p>Exploring systems & network security<br />Game testing & quality assurance<br />Editing · Design · Creative thinking</p></div></div><div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 technical text-muted-foreground"><span>Always learning</span><span>English / Tamil</span><span>Learning Italian / Latin</span></div></div></section>
      <section id="contact" className="contact-section"><div className="container-wide flex flex-col md:flex-row md:justify-between md:items-end gap-10"><div><div className="technical section-kicker">04 / The next lap</div><h2 className="contact-title">Let's build<br /><span>something great.</span></h2><a className="email-link" href="mailto:helenaalice725@gmail.com">helenaalice725@gmail.com <ArrowUpRight size={22} /></a></div><div className="flex flex-col items-start gap-4"><p className="text-muted-foreground text-sm max-w-64 leading-7">Have a project, an opportunity, or a shared love for racing? I'd love to hear from you.</p><div className="flex gap-3"><Button asChild variant="pitlane"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a></Button><Button asChild variant="ghost"><a href="/documents/alice-helena-resume.pdf" download><Download /> Resume</a></Button></div></div></div></section>
    </main>
    <footer className="footer"><div className="container-wide flex flex-wrap justify-between items-center gap-4"><span className="technical text-muted-foreground">© 2026 Alice Helena</span><span className="technical text-muted-foreground hidden sm:block">Fueled by curiosity. Inspired by motorsport.</span><div className="checker" aria-hidden="true" /></div></footer>
    <Dialog open={project !== null} onOpenChange={open => { if (!open) setProject(null); }}><DialogContent className="project-dialog"><DialogTitle className="font-display text-3xl">{project === 'student' ? 'Student Management System' : 'Brunplayer7'}</DialogTitle><DialogDescription>{project === 'student' ? 'C project by Alice Helena. Interactive browser adaptation of the uploaded program.' : 'Alice Helena’s music player app.'}</DialogDescription>{project === 'student' ? <StudentDemo /> : <><Button variant="pitlane" size="sm" className="justify-self-start" asChild><a href={appUrl} target="_blank" rel="noreferrer">Open in a new tab <ArrowUpRight /></a></Button><iframe className="app-frame" src={project === 'app' ? appUrl : undefined} title="Brunplayer7 music player" allow="autoplay" /></>}</DialogContent></Dialog>
  </>;
}
