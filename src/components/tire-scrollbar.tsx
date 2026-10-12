import { useEffect, useRef } from 'react';
import tireAsset from '@/assets/tire.png.asset.json';

export function TireScrollbar() {
  const rail = useRef<HTMLDivElement>(null);
  const tire = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      const track = rail.current;
      const wheel = tire.current;
      if (!track || !wheel) return;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      track.hidden = max <= 0;
      track.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      wheel.style.transform = `translateY(${progress * (track.clientHeight - wheel.clientHeight)}px) rotate(${motion.matches ? 0 : window.scrollY / 2}deg)`;
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    root.classList.add('tire-scroll-enabled');
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    update();
    return () => {
      root.classList.remove('tire-scroll-enabled');
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToPointer = (clientY: number) => {
    const track = rail.current;
    const wheel = tire.current;
    if (!track || !wheel) return;
    const bounds = track.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (clientY - bounds.top - wheel.clientHeight / 2) / (bounds.height - wheel.clientHeight)));
    window.scrollTo({ top: progress * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' });
  };

  return <div
    ref={rail}
    className="tire-scrollbar"
    role="scrollbar"
    tabIndex={0}
    aria-label="Portfolio scroll position"
    aria-controls="portfolio-content"
    aria-orientation="vertical"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={0}
    onPointerDown={event => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.focus({ preventScroll: true });
      scrollToPointer(event.clientY);
    }}
    onPointerMove={event => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) scrollToPointer(event.clientY);
    }}
    onPointerUp={event => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }}
    onKeyDown={event => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const targets: Record<string, number> = {
        ArrowDown: window.scrollY + 80, ArrowUp: window.scrollY - 80,
        PageDown: window.scrollY + window.innerHeight, PageUp: window.scrollY - window.innerHeight,
        Home: 0, End: max,
      };
      const target = targets[event.key];
      if (target === undefined) return;
      event.preventDefault();
      window.scrollTo({ top: Math.min(max, Math.max(0, target)), behavior: 'instant' });
    }}
  ><img ref={tire} src={tireAsset.url} alt="" draggable={false} width={36} height={36} /></div>;
}