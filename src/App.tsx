import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { InputPage } from '@/pages/InputPage'
import { HasilPage } from '@/pages/HasilPage'
import { DataPage } from '@/pages/DataPage'
import { MetodeDetailPage } from '@/pages/MetodeDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/hasil" element={<HasilPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/metode/:nama" element={<MetodeDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
