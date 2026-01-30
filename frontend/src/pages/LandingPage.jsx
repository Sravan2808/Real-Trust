import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Clients from '../components/Clients';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <Clients />
      <ContactForm />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default LandingPage;