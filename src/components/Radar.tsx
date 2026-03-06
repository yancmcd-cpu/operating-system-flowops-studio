"use client";

import { useState, useEffect } from 'react';
import { ScanEye, Filter, DatabaseZap, Github, MessageSquare, Briefcase, Activity } from 'lucide-react';
import styles from './Radar.module.css';
import { useLanguage } from './LanguageContext';

const CARDS_DATA = {
    en: [
        {
            industry: 'Property Management',
            region: 'Chon Buri, Thailand',
            score: 90,
            insight: 'Many rental agencies respond slowly to booking inquiries due to manual WhatsApp and email handling.',
            system: 'Automated lead intake and instant response system with CRM pipeline tracking.'
        },
        {
            industry: 'Rental Agencies',
            region: 'Chon Buri, Thailand',
            score: 84,
            insight: 'Property managers often handle booking inquiries across multiple messaging channels including WhatsApp, email and Facebook, creating fragmented communication and missed follow-ups.',
            system: 'Unified multi-channel messaging inbox with automated lead routing and response tracking.'
        },
        {
            industry: 'Hospitality Operators',
            region: 'Chon Buri, Thailand',
            score: 78,
            insight: 'Slow response times to booking requests are causing lost reservations and negative customer experiences.',
            system: 'AI-assisted booking response automation that instantly acknowledges inquiries and routes them into a structured booking pipeline.'
        }
    ],
    th: [
        {
            industry: 'การจัดการอสังหาริมทรัพย์',
            region: 'ชลบุรี ประเทศไทย',
            score: 90,
            insight: 'ตัวแทนให้เช่าหลายรายตอบกลับคำสอบถามการจองช้า เนื่องจากการจัดการ WhatsApp และอีเมลแบบแมนนวล',
            system: 'ระบบรับข้อมูลเบื้องต้นอัตโนมัติและระบบตอบกลับทันทีพร้อมการติดตามใน CRM'
        },
        {
            industry: 'ตัวแทนให้เช่า',
            region: 'ชลบุรี ประเทศไทย',
            score: 84,
            insight: 'ผู้จัดการอสังหาริมทรัพย์มักจะต้องจัดการคำถามเกี่ยวกับการจองผ่านช่องทางการรับส่งข้อความหลายช่องทาง รวมถึง WhatsApp, อีเมล และ Facebook ทำให้เกิดการสื่อสารที่กระจัดกระจายและพลาดการติดตามผล',
            system: 'กล่องจดหมายรวมช่องทางการรับส่งข้อความพร้อมการกำหนดเส้นทางและติดตามการตอบกลับอัตโนมัติ'
        },
        {
            industry: 'ผู้ประกอบการธุรกิจการบริการ',
            region: 'ชลบุรี ประเทศไทย',
            score: 78,
            insight: 'เวลาในการตอบกลับคำขอจองที่ช้าทำให้สูญเสียการจองและเกิดประสบการณ์เชิงลบกับลูกค้า',
            system: 'การตอบกลับการจองอัตโนมัติที่ช่วยเหลือโดย AI ซึ่งรับทราบคำถามทันทีและส่งไปยังขั้นตอนการจองที่มีโครงสร้าง'
        }
    ]
};

const SIGNALS_DATA = {
    en: [
        { source: 'Reddit /r/propertymanagement', text: '"Managing inquiries across WhatsApp and email is chaotic."' },
        { source: 'Industry Forum', text: '"Small agencies lose leads because response time is slow."' },
        { source: 'Customer Review', text: '"They took two days to respond to our booking request."' }
    ],
    th: [
        { source: 'Reddit /r/propertymanagement', text: '"การจัดการคำถามผ่าน WhatsApp และอีเมลนั้นวุ่นวายมาก"' },
        { source: 'ฟอรัมธุรกิจ', text: '"เอเจนซี่ขนาดเล็กสูญเสียลูกค้าเพราะตอบกลับช้า"' },
        { source: 'รีวิวจากลูกค้า', text: '"พวกเขาใช้เวลาสองวันกว่าจะตอบคำขอจองของเรา"' }
    ]
};

const TRANSLATIONS = {
    en: {
        radarTitle: "Opportunity Radar",
        radarSubtitle: "Continuous Market Intelligence",
        radarDesc: "Scanning industry discussions, forums and tool ecosystems for automation opportunities.",
        sourcesAnalyzed: "Sources analyzed:",
        analytics: "Analytics",
        opportunityDetected: "Opportunity Detected",
        score: "Score:",
        industry: "Industry",
        region: "Region",
        insight: "Insight",
        potentialSystem: "Potential System",
        recentSignals: "Recent Signals"
    },
    th: {
        radarTitle: "เรดาร์โอกาส",
        radarSubtitle: "ข้อมูลเชิงลึกตลาดอย่างต่อเนื่อง",
        radarDesc: "สแกนการสนทนาในอุตสาหกรรม ฟอรัม และระบบนิเวศเครื่องมือเพื่อหาโอกาสในระบบอัตโนมัติ",
        sourcesAnalyzed: "แหล่งที่มาที่วิเคราะห์:",
        analytics: "การวิเคราะห์",
        opportunityDetected: "ตรวจพบโอกาส",
        score: "คะแนน:",
        industry: "อุตสาหกรรม",
        region: "ภูมิภาค",
        insight: "ข้อมูลเชิงลึก",
        potentialSystem: "ระบบที่มีศักยภาพ",
        recentSignals: "สัญญาณล่าสุด"
    }
};

export default function Radar() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];
    const cards = CARDS_DATA[language as keyof typeof CARDS_DATA];
    const signals = SIGNALS_DATA[language as keyof typeof SIGNALS_DATA];
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % cards.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <section className={`section ${styles.radarSection}`}>
            <div className={`container ${styles.containerExt}`}>

                <div className={styles.header}>
                    <div className={styles.radarIconWrap}>
                        <ScanEye size={32} className={styles.iconScan} />
                    </div>
                    <h2>{t.radarTitle}</h2>
                    <p className="gradient-text">
                        {t.radarSubtitle}<br />
                        {t.radarDesc}
                    </p>
                </div>

                <div className={styles.radarVisualization}>

                    {/* External Sources Layer */}
                    <div className={styles.sourcesLayer}>
                        <div className={styles.sourcesLabel}>{t.sourcesAnalyzed}</div>
                        <div className={styles.nodesWrapper}>
                            <div className={`${styles.sourceNode} ${styles.animateFloat1}`}>
                                <MessageSquare size={20} />
                                <span>Reddit / Forums</span>
                            </div>
                            <div className={`${styles.sourceNode} ${styles.animateFloat2}`}>
                                <Briefcase size={20} />
                                <span>B2B Job Boards</span>
                            </div>
                            <div className={`${styles.sourceNode} ${styles.animateFloat3}`}>
                                <Github size={20} />
                                <span>Customer Reviews</span>
                            </div>
                        </div>
                    </div>

                    {/* Radar Scanning Core */}
                    <div className={styles.radarCore}>
                        <div className={styles.radarSweep} />
                        <div className={styles.radarRings}>
                            <div className={styles.ring1} />
                            <div className={styles.ring2} />
                            <div className={styles.ring3} />
                        </div>

                        <div className={styles.coreCenter}>
                            <Filter size={32} />
                            <div className={styles.coreLabel}>{t.analytics}</div>
                        </div>

                        {/* Simulated Data Hits */}
                        <div className={`${styles.dataHit} ${styles.hit1}`} />
                        <div className={`${styles.dataHit} ${styles.hit2}`} />
                        <div className={`${styles.dataHit} ${styles.hit3}`} />
                    </div>

                    {/* Ingestion Layer with Streamline Pointer */}
                    <div className={styles.injectionLayer}>
                        <div className={styles.streamLine} />

                        {/* Output Data Container: Cards on left, Signals on right */}
                        <div className={styles.dataOutputContainer}>

                            {/* Cycling Opportunity Card (Landscape) */}
                            <div className={styles.opportunityCardContainer}>
                                {cards.map((card, idx) => (
                                    <div
                                        key={idx}
                                        className={`${styles.ideaCard} ${idx === activeCard ? styles.cardActive : styles.cardHidden}`}
                                    >
                                        <div className={styles.ideaHeader}>
                                            <div className={styles.ideaHeaderLeft}>
                                                <DatabaseZap size={16} className={styles.zapIcon} />
                                                <span>{t.opportunityDetected}</span>
                                            </div>
                                            <span className={styles.tagScore}>{t.score} {card.score}</span>
                                        </div>

                                        <div className={styles.cardContentLandscape}>
                                            <div className={styles.cardMeta}>
                                                <div className={styles.cardSection}>
                                                    <span className={styles.cardLabel}>{t.industry}</span>
                                                    <span className={styles.cardValue}>{card.industry}</span>
                                                </div>
                                                <div className={styles.cardSection}>
                                                    <span className={styles.cardLabel}>{t.region}</span>
                                                    <span className={styles.cardValue}>{card.region}</span>
                                                </div>
                                            </div>

                                            <div className={styles.cardDetails}>
                                                <div className={styles.cardSection}>
                                                    <span className={styles.cardLabel}>{t.insight}</span>
                                                    <p className={styles.cardInsight}>{card.insight}</p>
                                                </div>
                                                <div className={styles.cardSection}>
                                                    <span className={styles.cardLabel}>{t.potentialSystem}</span>
                                                    <p className={styles.cardSystem}>{card.system}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Signals Feed */}
                            <div className={styles.signalsFeedOuter}>
                                <div className={styles.feedHeader}>
                                    <Activity size={16} />
                                    <span>{t.recentSignals}</span>
                                </div>
                                <div className={styles.signalsList}>
                                    {signals.map((sig, idx) => (
                                        <div key={idx} className={styles.signalItem}>
                                            <span className={styles.signalSource}>{sig.source}</span>
                                            <p className={styles.signalText}>{sig.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
