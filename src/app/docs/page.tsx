'use client';

import React, { useState, useEffect } from 'react'; // Added useEffect for logging
import Container from '../../components/Container';
import Section from '../../components/Section';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import SvgIcon from '../../ui/SvgIcon';

interface DocSection {
  id: string;
  titleKey: string;
  contentKey?: string;
  listKey?: string;
  outroKey?: string;
  tableKey?: string;
  codeExampleKey?: string;
  additionalContentKeys?: string[];
  subSections?: DocSection[];
}

interface ColorApplicationItem {
  title: string;
  items: string[];
}

// Define interfaces for the specific nested structures in localization files
interface LocalizedStep {
  title: string;
  description: string;
}

interface LocalizedNote {
  title: string;
  description: string;
}


interface DocConfigItem {
  id: string;
  titleKey: string;
  subtitleKey: string;
  sections: DocSection[];
}

const Docs: React.FC = () => {
  const { t, i18n, ready: isLoading } = useTranslation(); // Use useTranslation hook
  const [activeDocId, setActiveDocId] = useState('general_docs');

  // Get current language from i18n instance
  const language = i18n.language;

  const docsConfig: DocConfigItem[] = [
    {
      id: 'general_docs',
      titleKey: 'faq.docs.general.title',
      subtitleKey: 'faq.docs.general.subtitle',
      sections: [
        {
          id: 'general_section1',
          titleKey: 'faq.docs.general.section1.title',
          contentKey: 'faq.docs.general.section1.content',
        },
        {
          id: 'general_section2',
          titleKey: 'faq.docs.general.section2.title',
          additionalContentKeys: [
            'faq.docs.general.section2.vision_title',
            'faq.docs.general.section2.vision_content',
            'faq.docs.general.section2.mission_title',
            'faq.docs.general.section2.mission_content',
          ],
        },
        {
          id: 'general_section3',
          titleKey: 'faq.docs.general.section3.title',
          contentKey: 'faq.docs.general.section3.intro',
          listKey: 'faq.docs.general.section3.principles',
          outroKey: 'faq.docs.general.section3.outro',
        },
        {
          id: 'general_section4',
          titleKey: 'faq.docs.general.section4.title',
          contentKey: 'faq.docs.general.section4.intro',
          additionalContentKeys: ['faq.docs.general.section4.mvp_features_title'],
          listKey: 'faq.docs.general.section4.mvp_features',
          outroKey: 'faq.docs.general.section4.outro',
        },
        {
          id: 'general_section5',
          titleKey: 'faq.docs.general.section5.title',
          contentKey: 'faq.docs.general.section5.intro',
          listKey: 'faq.docs.general.section5.steps',
          outroKey: 'faq.docs.general.section5.outro',
        },
        {
          id: 'general_section6',
          titleKey: 'faq.docs.general.section6.title',
          contentKey: 'faq.docs.general.section6.intro',
          listKey: 'faq.docs.general.section6.stack',
        },
        {
          id: 'general_section7',
          titleKey: 'faq.docs.general.section7.title',
          contentKey: 'faq.docs.general.section7.intro',
          outroKey: 'faq.docs.general.section7.outro',
        },
        {
          id: 'general_section8',
          titleKey: 'faq.docs.general.section8.title',
          contentKey: 'faq.docs.general.section8.content',
        },
        {
          id: 'general_section9',
          titleKey: 'faq.docs.general.section9.title',
          contentKey: 'faq.docs.general.section9.intro',
          listKey: 'faq.docs.general.section9.steps',
          outroKey: 'faq.docs.general.section9.outro',
        },
        {
          id: 'general_section10',
          titleKey: 'faq.docs.general.section10.title',
          contentKey: 'faq.docs.general.section10.intro',
          listKey: 'faq.docs.general.section10.docs_list',
        },
        {
          id: 'general_section11',
          titleKey: 'faq.docs.general.section11.title',
          contentKey: 'faq.docs.general.section11.content',
        },
      ],
    },
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
          additionalContentKeys: ['faq.docs.design.section4.base_grid'],
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
    {
      id: 'localization_guide_docs',
      titleKey: 'faq.docs.localization_guide.title',
      subtitleKey: 'faq.docs.localization_guide.subtitle',
      sections: [
        {
          id: 'localization_section1',
          titleKey: 'faq.docs.localization_guide.section1.title',
          contentKey: 'faq.docs.localization_guide.section1.description',
        },
        {
          id: 'localization_section2',
          titleKey: 'faq.docs.localization_guide.section2.title',
          listKey: 'faq.docs.localization_guide.section2.goals',
        },
        {
          id: 'localization_section3',
          titleKey: 'faq.docs.localization_guide.section3.title',
          contentKey: 'faq.docs.localization_guide.section3.intro',
          tableKey: 'faq.docs.localization_guide.section3.table',
        },
        {
          id: 'localization_section4',
          titleKey: 'faq.docs.localization_guide.section4.title',
          contentKey: 'faq.docs.localization_guide.section4.intro',
          subSections: [
            {
              id: 'localization_subsection4_1',
              titleKey: 'faq.docs.localization_guide.section4.subsection4_1.title',
              contentKey: 'faq.docs.localization_guide.section4.subsection4_1.description',
            },
            {
              id: 'localization_section4_2',
              titleKey: 'faq.docs.localization_guide.section4.subsection4_2.title',
              listKey: 'faq.docs.localization_guide.section4.subsection4_2.points', // Changed from contentKey to listKey
              codeExampleKey: 'faq.docs.localization_guide.section4.subsection4_2.code_block',
            },
            {
              id: 'localization_section4_3',
              titleKey: 'faq.docs.localization_guide.section4.subsection4_3.title',
              contentKey: 'faq.docs.localization_guide.section4.subsection4_3.description',
              codeExampleKey: 'faq.docs.localization_guide.section4.subsection4_3.code_block',
            },
          ],
        },
        {
          id: 'localization_section5',
          titleKey: 'faq.docs.localization_guide.section5.title',
          contentKey: 'faq.docs.localization_guide.section5.intro',
          subSections: [
            {
              id: 'localization_section5_1',
              titleKey: 'faq.docs.localization_guide.section5.subsection5_1.title',
              contentKey: 'faq.docs.localization_guide.section5.subsection5_1.step1_intro',
              codeExampleKey: 'faq.docs.localization_guide.section5.subsection5_1.step1_code',
              subSections: [
                {
                  id: 'localization_section5_1_2',
                  titleKey: 'faq.docs.localization_guide.section5.subsection5_1.step2_title',
                  contentKey: 'faq.docs.localization_guide.section5.subsection5_1.step2_intro',
                  codeExampleKey: 'faq.docs.localization_guide.section5.subsection5_1.step2_code',
                },
                {
                  id: 'localization_section5_1_3',
                  titleKey: 'faq.docs.localization_guide.section5.subsection5_1.step3_title',
                  contentKey: 'faq.docs.localization_guide.section5.subsection5_1.step3_description',
                },
              ],
            },
            {
              id: 'localization_section5_2',
              titleKey: 'faq.docs.localization_guide.section5.subsection5_2.title',
              contentKey: 'faq.docs.localization_guide.section5.subsection5_2.intro',
              codeExampleKey: 'faq.docs.localization_guide.section5.subsection5_2.example_code',
              outroKey: 'faq.docs.localization_guide.section5.subsection5_2.outro',
            },
            {
              id: 'localization_section5_3',
              titleKey: 'faq.docs.localization_guide.section5.subsection5_3.title',
              contentKey: 'faq.docs.localization_guide.section5.subsection5_3.intro',
              subSections: [
                {
                  id: 'localization_section5_3_styles',
                  titleKey: 'faq.docs.localization_guide.section5.subsection5_3.styles_title',
                  contentKey: 'faq.docs.localization_guide.section5.subsection5_3.styles_description',
                  codeExampleKey: 'faq.docs.localization_guide.section5.subsection5_3.styles_code',
                },
                {
                  id: 'localization_section5_3_react_native',
                  titleKey: 'faq.docs.localization_guide.section5.subsection5_3.react_native_title',
                  contentKey: 'faq.docs.localization_guide.section5.subsection5_3.react_native_description',
                  codeExampleKey: 'faq.docs.localization_guide.section5.subsection5_3.react_native_code',
                  outroKey: 'faq.docs.localization_guide.section5.subsection5_3.outro',
                },
                {
                  id: 'localization_section5_3_icons',
                  titleKey: 'faq.docs.localization_guide.section5.subsection5_3.icons_title',
                  contentKey: 'faq.docs.localization_guide.section5.subsection5_3.icons_description',
                },
              ],
            },
          ],
        },
        {
          id: 'localization_section6',
          titleKey: 'faq.docs.localization_guide.section6.title',
          contentKey: 'faq.docs.localization_guide.section6.intro',
          listKey: 'faq.docs.localization_guide.section6.steps', // This key returns an array of objects
        },
        {
          id: 'localization_section7',
          titleKey: 'faq.docs.localization_guide.section7.title',
          contentKey: 'faq.docs.localization_guide.section7.intro',
          tableKey: 'faq.docs.localization_guide.section7.table',
          outroKey: 'faq.docs.localization_guide.section7.expansion_description',
        },
        {
          id: 'localization_section8',
          titleKey: 'faq.docs.localization_guide.section8.title',
          subSections: [
            {
              id: 'localization_section8_1',
              titleKey: 'faq.docs.localization_guide.section8.subsection8_1.title',
              listKey: 'faq.docs.localization_guide.section8.subsection8_1.recommendations',
            },
            {
              id: 'localization_section8_2',
              titleKey: 'faq.docs.localization_guide.section8.subsection8_2.title',
              listKey: 'faq.docs.localization_guide.section8.subsection8_2.recommendations',
            },
            {
              id: 'localization_section8_3',
              titleKey: 'faq.docs.localization_guide.section8.subsection8_3.title',
              listKey: 'faq.docs.localization_guide.section8.subsection8_3.recommendations',
            },
          ],
        },
        {
          id: 'localization_section9',
          titleKey: 'faq.docs.localization_guide.section8.section9.title',
          contentKey: 'faq.docs.localization_guide.section8.section9.intro',
          subSections: [
            {
              id: 'localization_section9_1',
              titleKey: 'faq.docs.localization_guide.section8.section9.dates_title',
              codeExampleKey: 'faq.docs.localization_guide.section8.section9.dates_code',
            },
            {
              id: 'localization_section9_2',
              titleKey: 'faq.docs.localization_guide.section8.section9.numbers_title',
              codeExampleKey: 'faq.docs.localization_guide.section8.section9.numbers_code',
            },
          ],
          outroKey: 'faq.docs.localization_guide.section8.section9.outro',
        },
        {
          id: 'localization_section10',
          titleKey: 'faq.docs.localization_guide.section8.section10.title',
          contentKey: 'faq.docs.localization_guide.section8.section10.intro',
          subSections: [
            {
              id: 'localization_section10_1',
              titleKey: 'faq.docs.localization_guide.section8.section10.scenarios_title',
              listKey: 'faq.docs.localization_guide.section8.section10.scenarios',
            },
            {
              id: 'localization_section10_2',
              titleKey: 'faq.docs.localization_guide.section8.section10.tools_title',
              listKey: 'faq.docs.localization_guide.section8.section10.tools',
            },
            {
              id: 'localization_section10_3',
              titleKey: 'faq.docs.localization_guide.section8.section10.success_criteria_title',
              listKey: 'faq.docs.localization_guide.section8.section10.success_criteria',
            },
          ],
        },
        {
          id: 'localization_section11',
          titleKey: 'faq.docs.localization_guide.section8.section11.title',
          listKey: 'faq.docs.localization_guide.section8.section11.notes', // This key returns an array of objects
        },
      ],
    }
  ];
  const activeDoc = docsConfig.find((doc: DocConfigItem) => doc.id === activeDocId);
  const sectionsToRender = activeDoc ? activeDoc.sections : [];

  // Log translations and active language on mount and language change
  useEffect(() => {
    console.log('Docs component mounted or language/t changed. Current language:', language); // Added more specific log
    // console.log('Current translations:', t('faq.docs.localization_guide')); // Log the entire localization guide section
  }, [language, t]);


  const renderSectionContent = (section: DocSection) => {
    console.log('Rendering section:', section.id); // Added general log for renderSectionContent
    // Get translated content for each potential key
    const content = section.contentKey ? t(section.contentKey) : null;
    const list = section.listKey ? t(section.listKey) : null;
    const outro = section.outroKey ? t(section.outroKey) : null;
    const table = section.tableKey ? t(section.tableKey) : null;
    const codeExample = section.codeExampleKey ? t(section.codeExampleKey) : null;
    const additionalContent = section.additionalContentKeys ? section.additionalContentKeys.map((key: string) => t(key)) : [];

    // Log values for problematic sections
    if (section.id.startsWith('localization_section')) {
        console.log(`Section ${section.id}:`);
        console.log(`  titleKey: ${section.titleKey}, value:`, t(section.titleKey));
        if (section.contentKey) console.log(`  contentKey: ${section.contentKey}, value:`, t(section.contentKey));
        if (section.listKey) console.log(`  listKey: ${section.listKey}, value:`, t(section.listKey));
        if (section.outroKey) console.log(`  outroKey: ${section.outroKey}, value:`, t(section.outroKey));
        if (section.tableKey) console.log(`  tableKey: ${section.tableKey}, value:`, t(section.tableKey));
        if (section.codeExampleKey) console.log(`  codeExampleKey: ${section.codeExampleKey}, value:`, t(section.codeExampleKey));
        if (section.additionalContentKeys) console.log(`  additionalContentKeys:`, section.additionalContentKeys.map(key => ({ key, value: t(key) })));

        if (section.subSections) {
            section.subSections.forEach(subSection => {
                console.log(`  Sub-section ${subSection.id}:`);
                console.log(`    titleKey: ${subSection.titleKey}, value:`, t(subSection.titleKey));
                 if (subSection.contentKey) console.log(`    contentKey: ${subSection.contentKey}, value:`, t(subSection.contentKey));
                 if (subSection.listKey) console.log(`    listKey: ${subSection.listKey}, value:`, t(subSection.listKey));
                 if (subSection.outroKey) console.log(`    outroKey: ${subSection.outroKey}, value:`, t(subSection.outroKey));
                 if (subSection.tableKey) console.log(`    tableKey: ${subSection.tableKey}, value:`, t(subSection.tableKey));
                 if (subSection.codeExampleKey) console.log(`    codeExampleKey: ${subSection.codeExampleKey}, value:`, t(subSection.codeExampleKey));
                 if (subSection.additionalContentKeys) console.log(`    additionalContentKeys:`, subSection.additionalContentKeys.map(key => ({ key, value: t(key) })));
            });
        }
    }


    return (
      <>
        {/* Render main content string */}
        {content && typeof content === 'string' && (
            <p className="docs-content-paragraph" dangerouslySetInnerHTML={{ __html: content }} />
        )}
         {/* Handle specific case for color_application which is an array of objects */}
        {content && typeof content === 'object' && Array.isArray(content) && section.contentKey === 'faq.docs.design.section2.color_application' && (
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
          <ul className={`docs-content-list ${section.listKey === 'faq.docs.general.section5.steps' || section.listKey === 'faq.docs.general.section9.steps' || section.listKey === 'faq.docs.localization_guide.section6.steps' || section.listKey === 'faq.docs.localization_guide.section10.scenarios' || section.listKey === 'faq.docs.localization_guide.section10.tools' || section.listKey === 'faq.docs.localization_guide.section10.success_criteria' || section.listKey === 'faq.docs.localization_guide.section11.notes' || section.listKey === 'faq.docs.userGuide.section2.section1.steps' || section.listKey === 'faq.docs.userGuide.section2.section2.steps' || section.listKey === 'faq.docs.userGuide.section2.section3.steps' || section.listKey === 'faq.docs.userGuide.section3.section1.features' || section.listKey === 'faq.docs.userGuide.section3.section2.features' || section.listKey === 'faq.docs.userGuide.section3.section3.features' || section.listKey === 'faq.docs.userGuide.section3.section4.features' || section.listKey === 'faq.docs.userGuide.section3.section5.settings' || section.listKey === 'faq.docs.userGuide.section3.section6.premium_features' || section.listKey === 'faq.docs.userGuide.section4.faq_list' || section.listKey === 'faq.docs.userGuide.section5.tips' || section.listKey === 'faq.docs.userGuide.section6.support_options' ? 'list-decimal' : ''}`}>
            {/* Handle specific list types that are arrays of objects */}
            {section.listKey === 'faq.docs.localization_guide.section6.steps' && (list as LocalizedStep[]).map((item, index) => (
                 <li key={index}>
                    <strong>{item.title}:</strong> <span dangerouslySetInnerHTML={{ __html: item.description }} />
                 </li>
            ))}
             {section.listKey === 'faq.docs.localization_guide.section11.notes' && (list as LocalizedNote[]).map((item, index) => (
                 <li key={index}>
                    <strong>{item.title}:</strong> <span dangerouslySetInnerHTML={{ __html: item.description }} />
                 </li>
            ))}
            {/* Handle generic lists (arrays of strings) */}
            {list && Array.isArray(list) && typeof list[0] === 'string' && (list as string[]).map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
             {/* Handle lists that are arrays of strings for localization guide sections */}
             {(section.listKey === 'faq.docs.localization_guide.section2.goals' ||
               section.listKey === 'faq.docs.localization_guide.section8.subsection8_1.recommendations' ||
               section.listKey === 'faq.docs.localization_guide.section8.subsection8_2.recommendations' ||
               section.listKey === 'faq.docs.localization_guide.section8.subsection8_3.recommendations' ||
               section.listKey === 'faq.docs.localization_guide.section10.scenarios' ||
               section.listKey === 'faq.docs.localization_guide.section10.tools' ||
               section.listKey === 'faq.docs.localization_guide.section10.success_criteria') && Array.isArray(list) && (list as string[]).map((item, index) => (
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
                 <code dangerouslySetInnerHTML={{ __html: codeExample }} />
             </pre>
        )}

         {/* Render code example 2 */}
         {/* Removed codeExampleKey2 rendering as it's no longer in the interface */}

        {/* Render outro string */}
        {outro && typeof outro === 'string' && (
            <p className="docs-content-paragraph" dangerouslySetInnerHTML={{ __html: outro }} />
        )}

        {/* Render additional content strings */}
        {additionalContent.map((item: unknown, index: number) => (
             item && typeof item === 'string' && (
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
