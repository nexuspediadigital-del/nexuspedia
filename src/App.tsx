/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  Monitor, 
  Database, 
  TrendingUp, 
  Palette,
  ChevronRight,
  Mail,
  User,
  MessageSquare,
  Send,
  Loader2,
  X
} from 'lucide-react';

export default function App() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [activeFilter, setActiveFilter] = useState('All');

  const services = [
    { name: 'Web Development', icon: <Monitor className="w-5 h-5" /> },
    { name: 'CRM | ERP', icon: <Database className="w-5 h-5" /> },
    { name: 'Digital Marketing', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'Graphic Designing', icon: <Palette className="w-5 h-5" /> },
  ];

  const projects = [
    { 
      id: 1, 
      title: "Luxe Summer '26", 
      category: "Fashion", 
      type: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
      desc: "A viral social campaign that drove 40% increase in seasonal sales."
    },
    { 
      id: 2, 
      title: "Urban Minimalist", 
      category: "Lifestyle", 
      type: "Graphic Designing",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      desc: "Complete brand identity redesign for a sustainable streetwear label."
    },
    { 
      id: 3, 
      title: "Aura Fragrances", 
      category: "Lifestyle", 
      type: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      desc: "Influencer-led launch strategy for a premium scent collection."
    },
    { 
      id: 4, 
      title: "Ethereal Bridal", 
      category: "Fashion", 
      type: "Graphic Designing",
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800",
      desc: "High-end editorial lookbook and digital catalog design."
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter || p.type === activeFilter);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Client-side validation
    const newErrors: { name?: string; email?: string; message?: string } = {};
    const name = data.name as string;
    const email = data.email as string;
    const message = data.message as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message || message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setStatusMessage(result.message);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setIsContactOpen(false);
          setFormStatus('idle');
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans selection:bg-orange-100 overflow-y-auto flex flex-col items-center p-4 md:p-8 gap-12 scroll-smooth">
      {/* Sticky Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/5"
      >
        <a href="#hero" className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center text-white text-[10px]">V</div>
          VogueVantage
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'About', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Portfolio', href: '#gallery' },
          ].map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-orange-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          className="px-5 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-orange-500 transition-all"
        >
          Contact Us
        </a>
      </motion.nav>

      {/* Poster Container */}
      <motion.div 
        id="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-6xl aspect-[16/10] md:aspect-[16/9] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-black/5 shrink-0"
      >
        {/* Left Content Side */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-between relative z-10">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles className="w-3 h-3" /> Premium Agency
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-4"
            >
              DIGITAL <br /> 
              <span className="text-orange-500">MARKETING</span>
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 mb-6"
            >
              For Fashion & Lifestyle Brands
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl italic font-serif text-gray-500 mb-10 border-l-4 border-orange-500 pl-6 py-2"
            >
              "Style sells. But only if people see it."
            </motion.p>

            <div className="space-y-4 mb-12">
              {[
                'Content that converts',
                'Sales-focused ad campaigns'
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center gap-3 text-lg font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Highlight Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-yellow-300 p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer"
            onClick={() => setIsContactOpen(true)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-16 h-16" />
            </div>
            <p className="text-xl font-black tracking-tight leading-tight relative z-10">
              We help fashion brands <br /> 
              <span className="underline decoration-black/20 decoration-4 underline-offset-4">go viral — and profitable.</span>
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              Get Started <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* Right Image Side */}
        <div className="flex-1 relative overflow-hidden bg-[#F5F5F5]">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="h-full w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
              alt="Fashion Model" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20" />
          </motion.div>

          {/* Floating Services Rail */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-0 left-0 w-full p-8 flex flex-wrap gap-3 justify-center md:justify-end z-20"
          >
            {services.map((service, idx) => (
              <motion.button
                key={service.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
                onMouseEnter={() => setHoveredService(service.name)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`px-5 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all shadow-xl ${
                  hoveredService === service.name 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white/90 backdrop-blur-md text-gray-800'
                }`}
              >
                <motion.span
                  animate={hoveredService === service.name ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : { 
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: hoveredService === service.name ? Infinity : 0,
                    ease: "easeInOut" 
                  }}
                >
                  {service.icon}
                </motion.span>
                {service.name}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Circle */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-12 right-12 w-32 h-32 hidden lg:flex items-center justify-center cursor-pointer"
            onClick={() => setIsContactOpen(true)}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white/80 backdrop-blur-sm rounded-full">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-black">
                <textPath xlinkHref="#circlePath">
                  Grow Your Brand • Scale Your Sales • Viral Growth •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-orange-500" />
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
      </motion.div>

      {/* About Us Section */}
      <motion.section 
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center px-4"
      >
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
            alt="VogueVantage Team" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-orange-500/10 mix-blend-multiply" />
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none">
              The Vision <br />
              <span className="text-orange-500">Behind The Style</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              VogueVantage isn't just an agency; we're architects of digital influence. Born in the heart of the fashion world, we bridge the gap between high-end aesthetics and high-performance marketing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { title: 'Our Mission', desc: 'To redefine fashion narratives through data-driven creativity and bold visual storytelling.' },
              { title: 'Our Values', desc: 'Innovation, Authenticity, and a relentless pursuit of the "Viral" factor in every campaign.' },
              { title: 'Our Expertise', desc: 'From boutique labels to global lifestyle giants, we scale brands that dare to be different.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className="border-l-4 border-orange-500 pl-6"
              >
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="w-full max-w-6xl px-4 py-20">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black tracking-tighter uppercase mb-4"
          >
            Our <span className="text-orange-500">Expertise</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium"
          >
            Tailored solutions for the modern lifestyle brand.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-xl hover:shadow-orange-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-3">{service.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Elevating your brand's presence through strategic {service.name.toLowerCase()} tailored for fashion audiences.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Gallery Section */}
      <section id="gallery" className="w-full max-w-6xl px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black tracking-tighter uppercase mb-4"
            >
              Project <span className="text-orange-500">Gallery</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 font-medium"
            >
              A curated selection of our most impactful work across fashion and lifestyle industries.
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Fashion', 'Lifestyle', 'Digital Marketing', 'Graphic Designing'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeFilter === filter 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-white text-gray-400 border border-black/5 hover:border-orange-500/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[9px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{project.desc}</p>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 group/link">
                    View Case Study <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Brand Spotlight Section */}
      <section className="w-full max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* The Bordered Image Box */}
            <div className="relative z-10 p-4 border-2 border-orange-500 rounded-[2.5rem] bg-white shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <div className="overflow-hidden rounded-[1.8rem] aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Vogue Spotlight" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Decorative Offset Border */}
            <div className="absolute -inset-4 border-2 border-black/5 rounded-[3rem] -z-0 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center rotate-12 shadow-xl z-20 group-hover:rotate-0 transition-transform duration-500">
              <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">
                New <br /> Collection
              </span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-none">
                Signature <br />
                <span className="text-orange-500">Visual Identity</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                We don't just take photos; we create icons. Our signature bordered aesthetic is designed to make your brand stand out in a crowded digital landscape.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                'Custom Frame Styling',
                'High-Contrast Visuals',
                'Editorial Grade Retouching'
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-800">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-colors shadow-xl"
            >
              Explore Our Style
            </motion.button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-black/5 mb-20"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-black tracking-tighter mb-4 uppercase"
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-500 font-medium"
          >
            Ready to take your brand to the next level? Send us a message.
          </motion.p>
        </div>

        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-2"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.name ? 'text-rose-500' : 'text-gray-400'}`} />
                <input 
                  name="name"
                  type="text" 
                  placeholder="Jane Doe"
                  className={`w-full pl-12 pr-6 py-4 bg-gray-50 border rounded-2xl transition-all outline-none ${
                    errors.name 
                      ? 'border-rose-500 bg-rose-50/30 focus:bg-white' 
                      : 'border-transparent focus:bg-white focus:border-orange-500'
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] font-bold text-rose-500 ml-2"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-2"
            >
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? 'text-rose-500' : 'text-gray-400'}`} />
                <input 
                  name="email"
                  type="email" 
                  placeholder="jane@example.com"
                  className={`w-full pl-12 pr-6 py-4 bg-gray-50 border rounded-2xl transition-all outline-none ${
                    errors.email 
                      ? 'border-rose-500 bg-rose-50/30 focus:bg-white' 
                      : 'border-transparent focus:bg-white focus:border-orange-500'
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] font-bold text-rose-500 ml-2"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-2"
          >
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
            <div className="relative">
              <MessageSquare className={`absolute left-4 top-6 w-4 h-4 transition-colors ${errors.message ? 'text-rose-500' : 'text-gray-400'}`} />
              <textarea 
                name="message"
                rows={4}
                placeholder="Tell us about your brand goals..."
                className={`w-full pl-12 pr-6 py-4 bg-gray-50 border rounded-2xl transition-all outline-none resize-none ${
                  errors.message 
                    ? 'border-rose-500 bg-rose-50/30 focus:bg-white' 
                    : 'border-transparent focus:bg-white focus:border-orange-500'
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.message && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] font-bold text-rose-500 ml-2"
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            disabled={formStatus === 'loading'}
            className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {formStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {formStatus === 'loading' ? 'Sending...' : 'Launch Project'}
          </motion.button>

          <AnimatePresence>
            {formStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5" /> {statusMessage}
              </motion.div>
            )}
            {formStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-rose-50 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-3"
              >
                <X className="w-5 h-5" /> {statusMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.section>

      {/* Footer Micro-label */}
      <div className="pb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
        <span>VogueVantage Agency</span>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <span>Est. 2026</span>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <span>Global Reach</span>
      </div>
    </div>
  );
}
