import { useState } from 'react';
import { Download, RotateCcw, Save, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sourceCode from '@/assets/student-management.c?raw';

type Student = { id: number; name: string; course: string; attendance: number; average: number; grade: string };
const initialStudents: Student[] = [
  { id: 1001, name: 'Alex Morgan', course: 'Computer Science', attendance: 92, average: 88, grade: 'B' },
  { id: 1002, name: 'Jamie Taylor', course: 'Mathematics', attendance: 78, average: 94, grade: 'A' },
];
export function StudentDemo() {
  const [tab, setTab] = useState('Students');
  const [students, setStudents] = useState(initialStudents);
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState(1001);
  const [source, setSource] = useState(false);
  const student = students.find(s => s.id === selected);
  function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (tab === 'Register') {
      if (students.length >= 100) { setNotice('Student limit reached: 100.'); return; }
      const newStudent = { id: Math.max(1000, ...students.map(s => s.id)) + 1, name: String(data.get('name')).trim(), course: String(data.get('course')).trim(), attendance: 0, average: 0, grade: 'N' };
      if (!newStudent.name || !newStudent.course) return;
      setStudents([...students, newStudent]); setSelected(newStudent.id); setNotice(`Student registered successfully. ID: ${newStudent.id}`); setTab('Students');
    } else if (student) {
      let updated = { ...student };
      if (tab === 'Course') updated.course = String(data.get('course')).trim();
      if (tab === 'Attendance') {
        const total = Number(data.get('total')); const attended = Number(data.get('attended'));
        if (attended > total) { setNotice('Classes attended cannot exceed total classes.'); return; }
        updated.attendance = Math.floor(attended * 100 / total);
      }
      if (tab === 'Marks') {
        const marks = Array.from({ length: 5 }, (_, i) => Number(data.get(`mark${i}`)));
        updated.average = marks.reduce((a, b) => a + b, 0) / 5;
        updated.grade = updated.average >= 90 ? 'A' : updated.average >= 75 ? 'B' : updated.average >= 60 ? 'C' : updated.average >= 40 ? 'D' : 'F';
      }
      setStudents(students.map(s => s.id === selected ? updated : s));
      setNotice(tab === 'Attendance' && updated.attendance < 75 ? `Attendance recorded: ${updated.attendance}%. Warning: below 75%!` : `${tab} updated successfully.`);
      setTab('Students');
    }
  }
  return <div>
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <span className="technical text-muted-foreground">Browser demo / sample records / session only</span>
      <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setSource(!source)}>{source ? 'Live demo' : 'View C source'}</Button><Button variant="ghost" size="icon" aria-label="Reset demo" title="Reset demo" onClick={() => { setStudents(initialStudents); setSelected(1001); setNotice('Demo reset.'); setTab('Students'); }}><RotateCcw /></Button></div>
    </div>
    {source ? <><Button variant="pitlane" size="sm" asChild><a href="/documents/student-management.c" download><Download /> Download C source</a></Button><pre className="code-view mt-4"><code>{sourceCode}</code></pre></> : <>
      <div className="demo-tabs">{['Students', 'Register', 'Course', 'Attendance', 'Marks', 'Ranking'].map(t => <Button key={t} variant={tab === t ? 'racing' : 'ghost'} size="sm" onClick={() => { setTab(t); setNotice(''); }}>{t}</Button>)}</div>
      <div role="status" className="demo-notice">{notice}</div>
      {(tab === 'Students' || tab === 'Ranking') ? <div className="overflow-x-auto"><table className="demo-table"><thead><tr>{[tab === 'Ranking' ? 'Rank' : 'ID', 'Name', 'Course', 'Attendance', 'Average', 'Grade'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{(tab === 'Ranking' ? [...students].sort((a,b) => b.average-a.average) : students).map((s,i) => <tr key={s.id}><td>{tab === 'Ranking' ? i+1 : s.id}</td><td>{s.name}</td><td>{s.course}</td><td>{s.attendance}%</td><td>{s.average.toFixed(2)}</td><td className="text-signal">{s.grade}</td></tr>)}</tbody></table></div> :
      <form key={`${tab}-${selected}`} className="demo-form" onSubmit={update}>
        {tab !== 'Register' && <label className="demo-field">Student<select value={selected} onChange={e => setSelected(Number(e.target.value))}>{students.map(s => <option key={s.id} value={s.id}>{s.id}: {s.name}</option>)}</select></label>}
        {tab === 'Register' && <label className="demo-field">Student name<input name="name" required maxLength={49} placeholder="Full name" /></label>}
        {(tab === 'Register' || tab === 'Course') && <label className="demo-field">Course<input name="course" required maxLength={29} defaultValue={tab === 'Course' ? student?.course : ''} placeholder="Computer Science" /></label>}
        {tab === 'Attendance' && <div className="grid grid-cols-2 gap-3"><label className="demo-field">Total classes<input name="total" type="number" min="1" max="10000" required /></label><label className="demo-field">Classes attended<input name="attended" type="number" min="0" max="10000" required /></label></div>}
        {tab === 'Marks' && <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">{Array.from({length:5}, (_,i) => <label key={i} className="demo-field">Subject {i+1}<input name={`mark${i}`} type="number" min="0" max="100" step="0.01" required /></label>)}</div>}
        <Button variant="racing" type="submit" className="justify-self-start">{tab === 'Register' ? <UserPlus /> : <Save />}{tab === 'Register' ? 'Register student' : 'Save changes'}</Button>
      </form>}
    </>}
  </div>;
}