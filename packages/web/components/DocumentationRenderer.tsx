import React from 'react';
// Assume you have a way to get the current translation object, e.g., via a hook
// import { useTranslation } from 'react-i18next';

// Define the expected structure of the documentation translations
interface DocSection {
  title: string;
  content?: string;
  intro?: string;
  outro?: string;
  principles?: string[];
  stack?: string[][]; // Example for technology stack
  steps?: string[]; // Example for getting started steps
  links?: string[]; // Example for documentation system links
  // Add other nested structures as needed based on en.json
  visionTitle?: string;
  visionContent?: string;
  missionTitle?: string;
  missionContent?: string;
  featuresTitle?: string;
  features?: string[];
  // Fix: Add missing properties found in architecture section
  future?: string;
  interaction?: string;
  // Fix: Add missing property found in projectStatus section
  progress?: string;
}

interface DocsTranslations {
  general: {
    title: string;
    subtitle: string;
    introduction: DocSection;
    visionAndMission: DocSection;
    keyPrinciples: DocSection;
    aboutMVP: DocSection;
    howWeBuild: DocSection;
    technologyStack: DocSection;
    architecture: DocSection;
    projectStatus: DocSection;
    gettingStarted: DocSection;
    documentationSystem: DocSection;
    contribution: DocSection;
    // Add other top-level sections under general if they exist
  };
  // Add other main doc sections like 'design', 'localizationGuide', etc. if they are rendered here
  design?: any; // Or define a specific interface for design docs
  localizationGuide?: any; // Or define a specific interface
  apiSpec?: any; // Or define a specific interface
  technicalDocs?: any; // Or define a specific interface
  userGuide?: any; // Or define a specific interface
  devGuide?: any; // Or define a specific interface
  integrationsGuide?: any; // Or define a specific interface
  optimizationGuide?: any; // Or define a specific interface
}


interface DocumentationRendererProps {
  // Assume the full translation object for the current language is passed
  translations: {
      docs: DocsTranslations;
      // ...other translation keys
  };
}

const DocumentationRenderer: React.FC<DocumentationRendererProps> = ({ translations }) => {
  // Access the documentation part of the translations
  const docs = translations?.docs?.general; // Focusing on 'general' as per en.json structure

  if (!docs) {
    // Handle case where translations are not loaded or structure is unexpected
    return <div>Error loading documentation translations or structure.</div>;
  }

  // --- Rendering Logic ---
  // Access nested translated strings directly using dot notation

  return (
    <div className="documentation-container"> {/* Add appropriate class names */}
      {/* Render General Section */}
      <h1>{docs.title}</h1>
      <h2>{docs.subtitle}</h2>

      {/* Render Introduction */}
      <section>
        <h3>{docs.introduction.title}</h3>
        {/* Use dangerouslySetInnerHTML if content contains HTML like <br/> or <strong> */}
        {/* Fix: Provide default empty string for potentially undefined content */}
        <p dangerouslySetInnerHTML={{ __html: docs.introduction.content ?? '' }}></p>
      </section>

      {/* Render Vision and Mission */}
      <section>
        <h3>{docs.visionAndMission.title}</h3>
        <h4>{docs.visionAndMission.visionTitle}</h4>
        <p>{docs.visionAndMission.visionContent}</p>
        <h4>{docs.visionAndMission.missionTitle}</h4>
        <p>{docs.visionAndMission.missionContent}</p>
      </section>

      {/* Render Key Principles */}
      <section>
        <h3>{docs.keyPrinciples.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.keyPrinciples.intro ?? '' }}></p>
        {/* Assuming principles are a list of strings */}
        <ul>
          {docs.keyPrinciples.principles?.map((principle, index) => (
            // Fix: Provide default empty string for potentially undefined principle
            <li key={index} dangerouslySetInnerHTML={{ __html: principle ?? '' }}></li>
          ))}
        </ul>
        {/* Fix: Provide default empty string for potentially undefined outro */}
        <p dangerouslySetInnerHTML={{ __html: docs.keyPrinciples.outro ?? '' }}></p>
      </section>

      {/* Render About MVP */}
      <section>
        <h3>{docs.aboutMVP.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.aboutMVP.intro ?? '' }}></p>
        <h4>{docs.aboutMVP.featuresTitle}</h4>
        <ul>
          {docs.aboutMVP.features?.map((feature, index) => (
            // Fix: Provide default empty string for potentially undefined feature
            <li key={index} dangerouslySetInnerHTML={{ __html: feature ?? '' }}></li>
          ))}
        </ul>
        {/* Fix: Provide default empty string for potentially undefined outro */}
        <p dangerouslySetInnerHTML={{ __html: docs.aboutMVP.outro ?? '' }}></p>
      </section>

      {/* Render How We Build */}
      <section>
        <h3>{docs.howWeBuild.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.howWeBuild.intro ?? '' }}></p>
        <ol>
          {docs.howWeBuild.steps?.map((step, index) => (
            // Fix: Provide default empty string for potentially undefined step
            <li key={index} dangerouslySetInnerHTML={{ __html: step ?? '' }}></li>
          ))}
        </ol>
        {/* Fix: Provide default empty string for potentially undefined outro */}
        <p dangerouslySetInnerHTML={{ __html: docs.howWeBuild.outro ?? '' }}></p>
      </section>

      {/* Render Technology Stack */}
      <section>
        <h3>{docs.technologyStack.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.technologyStack.intro ?? '' }}></p>
        {/* Rendering stack might require specific formatting, e.g., a table */}
        {/* This is a simplified list rendering */}
        <ul>
          {docs.technologyStack.stack?.map((itemArray, index) => (
             // Assuming each item is an array like ["Component", "Technology", ...]
             // Join array elements for display, or render in a table structure
             // Fix: Provide default empty string for potentially undefined itemArray elements
             <li key={index} dangerouslySetInnerHTML={{ __html: itemArray.join(': ') ?? '' }}></li>
          ))}
        </ul>
      </section>

      {/* Render Architecture */}
      <section>
        <h3>{docs.architecture.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.architecture.intro ?? '' }}></p>
        {/* Access future and interaction properties */}
        <p>{docs.architecture.future}</p>
        <p>{docs.architecture.interaction}</p>
        {/* If there's a Mermaid diagram code block, render it appropriately */}
        {/* Example: <pre><code>{docs.architecture.mermaidDiagram.code}</code></pre> */}
      </section>

      {/* Render Project Status */}
      <section>
        <h3>{docs.projectStatus.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined content */}
        <p dangerouslySetInnerHTML={{ __html: docs.projectStatus.content ?? '' }}></p>
        {/* Fix: Provide default empty string for potentially undefined progress */}
        <p dangerouslySetInnerHTML={{ __html: docs.projectStatus.progress ?? '' }}></p>
      </section>

      {/* Render Getting Started */}
      <section>
        <h3>{docs.gettingStarted.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.gettingStarted.intro ?? '' }}></p>
        <ol>
          {docs.gettingStarted.steps?.map((step, index) => (
            // Fix: Provide default empty string for potentially undefined step
            <li key={index} dangerouslySetInnerHTML={{ __html: step ?? '' }}></li>
          ))}
        </ol>
        {/* Fix: Provide default empty string for potentially undefined outro */}
        <p dangerouslySetInnerHTML={{ __html: docs.gettingStarted.outro ?? '' }}></p>
      </section>

      {/* Render Documentation System */}
      <section>
        <h3>{docs.documentationSystem.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined intro */}
        <p dangerouslySetInnerHTML={{ __html: docs.documentationSystem.intro ?? '' }}></p>
        <ul>
          {docs.documentationSystem.links?.map((link, index) => (
            // Fix: Provide default empty string for potentially undefined link
            <li key={index} dangerouslySetInnerHTML={{ __html: link ?? '' }}></li>
          ))}
        </ul>
      </section>

      {/* Render Contribution */}
      <section>
        <h3>{docs.contribution.title}</h3>
        {/* Fix: Provide default empty string for potentially undefined content */}
        <p dangerouslySetInnerHTML={{ __html: docs.contribution.content ?? '' }}></p>
      </section>

      {/* Add rendering for other top-level doc sections (design, userGuide, etc.) if they are part of this component */}
      {/* Example: */}
      {/*
      {translations?.docs?.userGuide && (
          <section>
              <h1>{translations.docs.userGuide.title}</h1>
              <h2>{translations.docs.userGuide.subtitle}</h2>
              // ... render user guide content similarly
          </section>
      )}
      */}

    </div>
  );
};

export default DocumentationRenderer;
