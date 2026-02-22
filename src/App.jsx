import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="lesson/:lessonId" element={<LessonPage />} />
      </Route>
    </Routes>
  );
}
