import { Navigate, Route, Routes } from "react-router-dom";

import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ResultPage } from "@/pages/ResultPage";
import { TermsPage } from "@/pages/TermsPage";
import { UploadPage } from "@/pages/UploadPage";
import { LocaleLayout } from "@/pages/LocaleLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ko" replace />} />
      <Route path="/upload" element={<Navigate to="/ko/upload" replace />} />
      <Route path="/result" element={<Navigate to="/ko/result" replace />} />
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/ko" replace />} />
    </Routes>
  );
}
