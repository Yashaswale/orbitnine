import Header from './components/Header.jsx'
import { Hero, Services, CoreSegments, Tourism } from './components/Sections1.jsx'
import { Ecosystem, Partnerships, Collaborate } from './components/Sections2.jsx'
import { Roadmap, GTM, GlobalReach, Education, Investors, Connect, Footer } from './components/Sections3.jsx'
import { EnquiryFormProvider } from './components/EnquiryForm.jsx'
import './components/EnquiryForm.css'

export default function App() {
  return (
    <EnquiryFormProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <CoreSegments />
        <Tourism />
        <Ecosystem />
        <Partnerships />
        <Collaborate />
        <Roadmap />
        <GTM />
        <GlobalReach />
        <Education />
        <Investors />
        <Connect />
      </main>
      <Footer />
    </EnquiryFormProvider>
  )
}
