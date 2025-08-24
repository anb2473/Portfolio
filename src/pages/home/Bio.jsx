import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import 'devicon/devicon.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Bio.css'; // You'll need to create this CSS file

const Bio = () => {
  const tools = [
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'VSCode', icon: 'devicon-vscode-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
    { name: 'Kubernetes', icon: 'devicon-kubernetes-plain colored' },
    { name: 'SQLite', icon: 'devicon-sqlite-plain colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'Rust', icon: 'devicon-rust-plain colored' },
    { name: 'C', icon: 'devicon-c-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'Java', icon: 'devicon-java-plain colored' },
    { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Vite', icon: 'devicon-vite-plain colored' },
  ];

  const learning = [
    '💾 Database systems',
    '🏢 Business logic tools',
    '🔄 Version control systems',
    '⚙️ Interpreters and compilers',
    '📈 Autonomous trading'
  ];

  const projects = [
    {
      emoji: '💾',
      name: 'Flint Engine',
      description: 'Database designed to be extremely lightweight and minimalist',
      url: 'https://github.com/anb2473/flint-engine',
      status: 'In Progress'
    },
    {
      emoji: '🤖',
      name: 'Kalshi Autonomous Trader',
      description: 'An autonomous trader for kalshi',
      url: 'https://github.com/anb2473/kalshi-autonomous-trader',
      status: 'In Progress'
    },
    {
        emoji: '🖥️',
        name: 'Obsidian',
        description: 'An IR (Intermediate Representation) compiler, designed to allow easy construction of a full high level language.',
        url: 'https://github.com/anb2473/obsidian',
        status: 'In Progress'
    },
    {
        emoji: '🧠',
        name: 'Skill Bytes',
        description: 'Skill Bytes, a platform to prevent deterioration of programming skills from AI.',
        url: 'https://skill-bytes.netlify.app',
        status: 'Active'
    },
  ];

  return (
    <div className="bio-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="title"
        >
          What I'm Building
        </motion.h1>
        <TypeAnimation
          sequence={[
            'Open Source Contributor',
            2000,
            'Building the Flint Engine',
            2000,
            'Creating Trading Solutions',
            2000,
            'Building ERP and CRM',
            2000
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
          className="subtitle"
        />
      </section>

      {/* Projects */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2>🚀 Projects I'm Working On</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <div className="project-emoji">{project.emoji}</div>
              <div className="project-details">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* What I'm Learning */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2>🌱 What I'm Learning</h2>
        <ul className="learning-list">
          {learning.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Tools I Use */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2>🛠️ Tools I Use</h2>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="tool-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <i className={tool.icon}></i>
              <span>{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Contact */}
      <motion.section 
        className="contact-section"
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="contact-links">
          <a href="mailto:austinnabilblass@gmail.com" className="contact-button">
            <i className="fas fa-envelope"></i> Email
          </a>
          <a href="https://wa.me/12024001681" className="contact-button">
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a href="https://github.com/anb2473" className="contact-button">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default Bio;