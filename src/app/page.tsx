import React from 'react';
import Container from '../components/Container';
import Hero from '../ui/Hero';
import News from '../ui/News';
import Features from '../ui/Features';
import Roadmap from '../ui/Roadmap';

const Home = () => {
  return (
    <Container>
      <Hero />
      <News />
      <Features />
      <Roadmap />
    </Container>
  );
};

export default Home;