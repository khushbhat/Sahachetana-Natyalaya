import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from '../pages/Home/HomePage';
import { FoundersPage } from '../pages/Founders/FoundersPage';
import { ClassesPage } from '../pages/Classes/ClassesPage';
import { ProgramsPage } from '../pages/Programs/ProgramsPage';
import { AnnualEventsPage } from '../pages/AnnualEvents/AnnualEventsPage';
import { AwardsPage } from '../pages/Awards/AwardsPage';
import { ContactPage } from '../pages/Contact/ContactPage';
import { GalleryPage } from '../pages/Gallery/GalleryPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// The admin prototype is only loaded when someone opens it
const AdminPage = lazy(() => import('../pages/Admin/AdminPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="founders" element={<FoundersPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="annual-events" element={<AnnualEventsPage />} />
          <Route path="awards" element={<AwardsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route
            path="admin"
            element={
              <Suspense fallback={<div className="container section">Loading the admin prototype…</div>}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
