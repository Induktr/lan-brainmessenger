'use client';

import React, { useState } from 'react';
import Container from '../../components/Container'; // Corrected path
import Section from '../../components/Section'; // Corrected path
import Link from 'next/link';
import { useLanguage } from '../../app/context/LanguageContext'; // Corrected path
import SvgIcon from '../../ui/SvgIcon'; // Explicitly add SvgIcon import

interface DocSection {
  id: string;
  titleKey: string;
  contentKey?: string;
  listKey?: string;
  outroKey?: string;
  tableKey?: string;
  codeExampleKey?: string;
  codeExampleKey2?: string; // Added codeExampleKey2
  additionalContentKeys?: string[];
  subSections?: DocSection[];
}

interface ColorApplicationItem {
  title: string;
  items: string[];
}

interface DocConfigItem {
  id: string;
  titleKey: string;
  subtitleKey: string;
  sections: DocSection[];
}

const Docs: React.FC = () => {
  const { t, isLoading } = useLanguage(); // Get isLoading from the hook
  const [activeDocId, setActiveDocId] = useState('design_system_docs'); // 'general_docs', 'design_system_docs', 'localization_guide_docs', or 'user_guide_docs'




const docsConfig: DocConfigItem[] = [
  {
    id: 'design_system_docs',
    titleKey: 'faq.docs.design.title',
    subtitleKey: 'faq.docs.design.subtitle',
    sections: [
      {
        id: 'design_section1',
        titleKey: 'faq.docs.design.section1.title',
        additionalContentKeys: [
          'faq.docs.design.section1.name',
          'faq.docs.design.section1.description',
          'faq.docs.design.section1.goal',
          'faq.docs.design.section1.principles_title',
        ],
        listKey: 'faq.docs.design.section1.principles',
      },
      {
        id: 'design_section2',
        titleKey: 'faq.docs.design.section2.title',
        contentKey: 'faq.docs.design.section2.intro',
        subSections: [
          {
            id: 'design_section2_1',
            titleKey: 'faq.docs.design.section2.light_mode_title',
            tableKey: 'faq.docs.design.section2.light_mode_table',
          },
          {
            id: 'design_section2_2',
            titleKey: 'faq.docs.design.section2.dark_mode_title',
            tableKey: 'faq.docs.design.section2.dark_mode_table',
          },
          {
            id: 'design_section2_3',
            titleKey: 'faq.docs.design.section2.premium_colors_title',
            listKey: 'faq.docs.design.section2.premium_colors',
          },
          {
            id: 'design_section2_4',
            titleKey: 'faq.docs.design.section2.color_application_title',
            contentKey: 'faq.docs.design.section2.color_application',
          },
          {
            id: 'design_section2_5',
            titleKey: 'faq.docs.design.section2.usage_recommendations_title',
            listKey: 'faq.docs.design.section2.usage_recommendations',
          },
        ],
      },
      {
        id: 'design_section3',
        titleKey: 'faq.docs.design.section3.title',
        contentKey: 'faq.docs.design.section3.intro',
        subSections: [
          {
            id: 'design_section3_1',
            titleKey: 'faq.docs.design.section3.primary_font_title',
            listKey: 'faq.docs.design.section3.primary_font',
          },
          {
            id: 'design_section3_2',
            titleKey: 'faq.docs.design.section3.sizes_styles_title',
            tableKey: 'faq.docs.design.section3.sizes_styles_table',
          },
          {
            id: 'design_section3_3',
            titleKey: 'faq.docs.design.section3.notes_title',
            listKey: 'faq.docs.design.section3.notes',
          },
        ],
      },
      {
        id: 'design_section4',
        titleKey: 'faq.docs.design.section4.title',
        contentKey: 'faq.docs.design.section4.intro',
        subSections: [
          {
            id: 'design_section4_1',
            titleKey: 'faq.docs.design.section4.principles_title',
            listKey: 'faq.docs.design.section4.principles',
          },
          {
            id: 'design_section4_2',
            titleKey: 'faq.docs.design.section4.list_title',
            tableKey: 'faq.docs.design.section4.list_table',
          },
          {
            id: 'design_section4_3',
            titleKey: 'faq.docs.design.section4.implementation_examples_title',
            additionalContentKeys: [
              'faq.docs.design.section4.css_ripple_title',
              'faq.docs.design.section4.rn_icon_title',
            ],
            codeExampleKey: 'faq.docs.design.section4.css_ripple_code',
            codeExampleKey2: 'faq.docs.design.section4.rn_icon_code',
          },
        ],
      },
      {
        id: 'design_section5',
        titleKey: 'faq.docs.design.section5.title',
        contentKey: 'faq.docs.design.section5.intro',
        additionalContentKeys: ['faq.docs.design.section5.base_grid'],
        subSections: [
          {
            id: 'design_section5_1',
            titleKey: 'faq.docs.design.section5.alignment_title',
            listKey: 'faq.docs.design.section5.alignment',
          },
          {
            id: 'design_section5_2',
            titleKey: 'faq.docs.design.section5.adaptability_title',
            listKey: 'faq.docs.design.section5.adaptability',
          },
        ],
      },
      {
        id: 'design_section6',
        titleKey: 'faq.docs.design.section6.title',
        contentKey: 'faq.docs.design.section6.intro',
        listKey: 'faq.docs.design.section6.principles',
      },
      {
        id: 'design_section7',
        titleKey: 'faq.docs.design.section7.title',
        listKey: 'faq.docs.design.section7.notes',
      },
    ],
  },
];
  const activeDoc = docsConfig.find((doc: DocConfigItem) => doc.id === activeDocId);
  const sectionsToRender = activeDoc ? activeDoc.sections : [];

  // Add a loading check here
  if (isLoading) {
    return <div className="docs-loading">Loading documentation...</div>; // Display a loading message or spinner
  }

  const renderSectionContent = (section: DocSection) => {
    // Get translated content for each potential key, handling unknown return type
    const content = section.contentKey ? t(section.contentKey) as unknown : null;
    const list = section.listKey ? t(section.listKey) as unknown : null;
    const outro = section.outroKey ? t(section.outroKey) as unknown : null;
    const table = section.tableKey ? t(section.tableKey) as unknown : null;
    const codeExample = section.codeExampleKey ? t(section.codeExampleKey) as unknown : null;
    const codeExample2 = section.codeExampleKey2 ? t(section.codeExampleKey2) as unknown : null; // Get second code example
    const additionalContent = section.additionalContentKeys ? section.additionalContentKeys.map((key: string) => t(key) as unknown) : []; // Cast additional content items to unknown

    return (
      <>
        {/* Render main content string */}
        {content && typeof content === 'string' && (
            <p className="docs-content-paragraph" dangerouslySetInnerHTML={{ __html: content }} />
        )}
         {/* Handle specific case for color_application which is an array of objects */}
        {content && typeof content === 'object' && Array.isArray(content) && section.contentKey === 'docs.design.section2.color_application' && (
            (content as ColorApplicationItem[]).map((item: ColorApplicationItem, idx: number) => (
                <div key={idx} className="mb-4">
                    <h4 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <ul className="docs-content-list">
                        {item.items.map((subItem: string, subIdx: number) => (
                            <li key={subIdx} dangerouslySetInnerHTML={{ __html: subItem }} />
                        ))}
                    </ul>
                </div>
            ))
        )}

        {/* Render list content */}
        {list && Array.isArray(list) && (
          <ul className={`docs-content-list ${section.listKey === 'docs.general.howWeBuild.steps' || section.listKey === 'docs.general.gettingStarted.steps' || section.listKey === 'docs.localizationGuide.section6.testing_scenarios' || section.listKey === 'docs.localizationGuide.section10.scenarios_points' || section.listKey === 'docs.devGuide.devProcess.envSetup.steps' ? 'list-decimal' : ''}`}> {/* Added devGuide steps */}
            {(list as string[]).map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}

        {/* Render table content */}
        {table && Array.isArray(table) && table.length > 0 && Array.isArray(table[0]) && (
            <div className="docs-table-container">
                <table className="docs-table">
                    <thead>
                        <tr className="docs-table-header-row">
                            {(table[0] as string[]).map((header, index) => (
                                <th key={index} className="docs-table-header-cell" dangerouslySetInnerHTML={{ __html: header }} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(table as string[][]).slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex} className="docs-table-row">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="docs-table-cell" dangerouslySetInnerHTML={{ __html: cell }} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {/* Render code example 1 */}
        {codeExample && typeof codeExample === 'string' && (
             <pre className="docs-code-block">
                 {/* Extract language from the first line if needed, or assume a default */}
                 {/* For simplicity, just render the raw string with HTML */}
                 <code dangerouslySetInnerHTML={{ __html: codeExample }} />
             </pre>
        )}

         {/* Render code example 2 */}
         {codeExample2 && typeof codeExample2 === 'string' && (
             <pre className="docs-code-block">
                 <code dangerouslySetInnerHTML={{ __html: codeExample2 }} />
             </pre>
         )}


        {/* Render outro string */}
        {outro && typeof outro === 'string' && (
            <p className="docs-content-paragraph" dangerouslySetInnerHTML={{ __html: outro }} />
        )}

        {/* Render additional content strings */}
        {additionalContent.map((item: unknown, index: number) => (
             item && typeof item === 'string' && ( // Ensure item is a non-empty string
                <p key={`add-content-${index}`} className="docs-content-paragraph" dangerouslySetInnerHTML={{ __html: item }} />
             )
        ))}
      </>
    );
  };

  return (
    <div className="docs-page-container">
      {/* Sidebar Navigation */}
      <aside className="docs-sidebar">
        <h2 className="docs-sidebar-title">{activeDoc ? t(activeDoc.titleKey) as string : ''}</h2>
        <nav>
          <ul>
            {sectionsToRender.map((section) => (
              <React.Fragment key={section.id}>
                <li className="mb-2">
                  <Link
                    href={`#${section.id}`}
                    className="docs-nav-link"
                  >
                    {t(section.titleKey) as string}
                  </Link>
                </li>
                {section.subSections && (
                    <ul className="docs-sub-nav-list">
                        {section.subSections.map((subSection: DocSection) => (
                            <li key={subSection.id} className="mb-2">
                                <Link
                                    href={`#${subSection.id}`}
                                    className="docs-nav-link"
                                >
                                    {t(subSection.titleKey) as string}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <Container className="docs-main-content">
        <div className="mb-12">
          <Link
            href="/"
            className="docs-back-link"
          >
            <SvgIcon iconName="arrowLeft" title={t('common.backToHome') as string} className="svg-icon" />
            {t('common.backToHome') as string}
          </Link>
          <div className="docs-header-row">
            <h1 className="docs-main-title">{activeDoc ? t(activeDoc.titleKey) as string : ''}</h1>
            <select
              value={activeDocId}
              onChange={(e) => setActiveDocId(e.target.value)}
              className="docs-select"
            >
              {docsConfig.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {t(doc.titleKey) as string}
                </option>
              ))}
            </select>
          </div>
          <p className="docs-subtitle">
            {activeDoc ? t(activeDoc.subtitleKey) as string : ''}
          </p>
        </div>

        {sectionsToRender.map((section) => (
          <Section key={section.id} id={section.id} className="docs-subsection-container">
            <h2 className="docs-section-title">{t(section.titleKey) as string}</h2>
            {renderSectionContent(section)}
            {section.subSections && section.subSections.map((subSection: DocSection) => (
                <div key={subSection.id} id={subSection.id} className="docs-subsection-container">
                    <h3 className="docs-subsection-title">{t(subSection.titleKey) as string}</h3>
                    {renderSectionContent(subSection)}
                </div>
            ))}
          </Section>
        ))}
      </Container>
    </div>
  );
};

export default Docs;
