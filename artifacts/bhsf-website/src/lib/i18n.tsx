import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "en" | "tl" | "ru";

const en: Record<string, string> = {};

const tl: Record<string, string> = {
  // ---- Brand / Navbar ----
  "Barangay Health Support": "Suportang Pangkalusugan ng Barangay",
  "Mission": "Misyon",
  "Programs": "Mga Programa",
  "Impact": "Epekto",
  "Donate Now": "Mag-donate Ngayon",

  // ---- Hero ----
  "Better Health for Every Barangay": "Mas Mabuting Kalusugan para sa Bawat Barangay",
  "No family should have to choose between their next meal and essential medicine. Help us bring care directly to rural communities.":
    "Walang pamilyang dapat pumili sa pagitan ng kanilang hapunan at mahalagang gamot. Tulungan kaming dalhin ang pangangalaga nang direkta sa mga pamayanang kanayunan.",
  "Make a Donation": "Mag-donate",
  "Learn More": "Matuto Pa",

  // ---- Mission ----
  "Our Mission": "Ang Aming Misyon",
  "To improve healthcare access and quality of life in rural barangays of Sanchez Mira, Cagayan, Philippines.":
    "Upang mapabuti ang pag-access sa pangangalagang pangkalusugan at kalidad ng buhay sa mga kanayunang barangay ng Sanchez Mira, Cagayan, Pilipinas.",
  "Rooted in Community": "Nakaugat sa Pamayanan",
  "We work directly with barangay captains and local health workers to ensure aid reaches those who need it most.":
    "Direkta kaming nakikipagtulungan sa mga kapitan ng barangay at lokal na manggagawang pangkalusugan upang matiyak na ang tulong ay makararating sa mga higit na nangangailangan.",
  "Warm & Trustworthy": "Mainit at Mapagkakatiwalaan",
  "Healthcare shouldn't feel institutional. We bring a human touch, treating every patient with dignity and deep care.":
    "Ang pangangalagang pangkalusugan ay hindi dapat makaramdam ng institusyonal. Nagdadala kami ng makataong paghawak, tinatrato ang bawat pasyente nang may dignidad at malalim na pag-aalaga.",
  "Sustainable Impact": "Matatagal na Epekto",
  "Beyond one-time visits, we establish ongoing support systems to monitor and maintain the health of rural families.":
    "Higit pa sa isang beses na pagbisita, nagtatatag kami ng patuloy na sistema ng suporta upang subaybayan at mapanatili ang kalusugan ng mga pamilyang kanayunan.",

  // ---- SanchezMira (Where We Work) ----
  "Where We Work": "Kung Saan Kami Nagtatrabaho",
  "Sanchez Mira is a 3rd-class coastal municipality in the province of Cagayan, Philippines. It covers 218.77 square kilometers and has a population of over 26,000 people. Formerly called Malolokit, it was named after Spanish Brigadier General Manuel Sanchez Mira. Its people are resilient and proud — but geographic isolation and poverty mean that basic healthcare is often out of reach for the families who need it most.":
    "Ang Sanchez Mira ay isang ika-3 klase na baybaying munisipalidad sa lalawigan ng Cagayan, Pilipinas. Sumasaklaw ito ng 218.77 kilometrong parisukat at may populasyong higit sa 26,000 katao. Dating tinawag na Malolokit, pinangalanan ito mula sa Kastilang Brigadier General na si Manuel Sanchez Mira. Matatag at mapagmataas ang mga tao nito — ngunit ang heograpikong pagkahiwalay at kahirapan ay nangangahulugan na ang pangunahing pangangalagang pangkalusugan ay kadalasang hindi abot-kaya para sa mga pamilyang higit na nangangailangan.",
  "and": "at",
  "Why Healthcare Here Is Different": "Bakit Iba ang Pangangalagang Pangkalusugan Dito",
  "Location": "Lokasyon",
  "Geography": "Heograpiya",
  "History": "Kasaysayan",
  "Heritage": "Pamanang Kultura",
  "Cagayan Valley (Region II), Cagayan Province — approx. 632 km from Manila":
    "Lambak ng Cagayan (Rehiyon II), Lalawigan ng Cagayan — humigit-kumulang 632 km mula sa Maynila",
  "A 3rd-class coastal municipality covering 218.77 km², with 18 barangays spread across coastal plains and upland areas":
    "Isang ika-3 klase na baybaying munisipalidad na sumasaklaw sa 218.77 km², na may 18 barangay sa mga kapatagang baybayin at kabundukan",
  "Originally a Kalinga hunting ground and Spanish mission area before Ilocos settlers arrived to farm; formerly called Malolokit, officially founded and named in 1884 after Spanish Brigadier General Manuel Sanchez Mira":
    "Dati itong lugar ng pangangaso ng mga Kalinga at lugar ng misyong Kastila bago dumating ang mga Ilokano upang magsaka; dating tinawag na Malolokit, opisyal na itinatag at pinangalanan noong 1884 mula sa Kastilang Brigadier General na si Manuel Sanchez Mira",
  "Home to the historic Santa Maria Magdalena Church ruins (also known as Pata or Nagsimbaanan Church), dating back to 1595":
    "Tahanan ng makasaysayang mga guho ng Simbahan ng Santa Maria Magdalena (kilala rin bilang Simbahan ng Pata o Nagsimbaanan), mula pa noong 1595",
  "The coastal municipality of Sanchez Mira, Cagayan — the landscape we serve":
    "Ang baybaying munisipalidad ng Sanchez Mira, Cagayan — ang tanawing aming pinaglilingkuran",
  "— Barangay resident, Sanchez Mira": "— Residente ng barangay, Sanchez Mira",
  "When my daughter had a high fever, the nearest clinic was a one-hour tricycle ride on a muddy road. By the time we arrived, it was dark and the doctor had already left.":
    "Noong mataas ang lagnat ng aking anak, ang pinakamalapit na klinika ay isang oras na biyahe ng traysikel sa maputik na daan. Pagdating namin, madilim na at umuwi na ang doktor.",
  "The Local Crisis": "Ang Krisis sa Lokal",
  "The Reality on the Ground: Distance, Climate, and Access":
    "Ang Katotohanan sa Lupa: Distansya, Klima, at Pag-access",
  "Why Sanchez Mira Faces Acute Healthcare Vulnerabilities":
    "Bakit Nahaharap ang Sanchez Mira sa Malubhang Kahinaan sa Pangangalagang Pangkalusugan",
  "Distance to Tertiary Care": "Distansya sa Tersyaryong Pangangalaga",
  "Typhoon & Seasonal Isolation": "Bagyo at Pana-panahong Pagkahiwalay",
  "Vulnerable & Remote Barangays": "Mga Mahina at Malayong Barangay",
  "Communities most at risk when disaster strikes": "Mga pamayanang higit na nanganganib kapag tumama ang sakuna",
  "Coastal Fisherfolk Communities": "Mga Pamayanan ng Mangingisda sa Baybayin",
  "Inland & Upland Farming Settlements": "Mga Pamayanang Magsasaka sa Looban at Kabundukan",
  "Basic waterborne and respiratory illnesses spike during monsoon months.":
    "Dumarami ang mga sakit mula sa tubig at sakit sa paghinga tuwing mga buwan ng tag-ulan.",
  "Cutting off access even to the municipal town center.":
    "Nahahadlangan pa ang pag-access sa sentro ng munisipalidad.",
  "Sanchez Mira relies on local Rural Health Units (RHUs) and district facilities for primary care. However, for specialized interventions, major trauma, surgical procedures, or advanced diagnostics, patients must travel to":
    "Umaasa ang Sanchez Mira sa mga lokal na Rural Health Unit (RHU) at pasilidad ng distrito para sa pangunahing pangangalaga. Gayunpaman, para sa mga espesyalisadong interbensyon, malubhang pinsala, operasyon, o advanced na diagnosis, kailangang maglakbay ang mga pasyente patungong",
  "This trip spans approximately": "Ang biyaheng ito ay humigit-kumulang",
  "and takes": "at tumatagal ng",
  "by road under normal conditions.": "sa pamamagitan ng daan sa normal na kondisyon.",
  "Located along the northern coastline facing the Babuyan Channel, the municipality lies directly in the path of seasonal Pacific typhoons (typically July to December). Heavy rains and storm surges routinely cause flash flooding, swell river crossings, and trigger coastal road cut-offs along the Manila North Road corridor, isolating communities for days at a time.":
    "Matatagpuan sa hilagang baybayin na nakaharap sa Babuyan Channel, ang munisipalidad ay direktang nasa daanan ng pana-panahong bagyo sa Pasipiko (karaniwang Hulyo hanggang Disyembre). Ang malalakas na ulan at storm surge ay karaniwang nagdudulot ng biglaang baha, pagtaas ng tubig sa ilog, at pagputol ng kalsada sa baybayin sa koridor ng Manila North Road, na naghihiwalay sa mga pamayanan sa loob ng ilang araw.",
  "high exposure to storm surges, wind damage, and chronic seasonal loss of income during rough seas.":
    "mataas na pagkakalantad sa storm surge, pinsala ng hangin, at palagiang pagkawala ng kita tuwing maalon ang dagat.",
  "dispersed sitios and puroks face unpaved access routes that become impassable during typhoons.":
    "nakakalat na mga sitio at purok ang nahaharap sa mga daang hindi sementado na hindi madaanan tuwing bagyo.",
  "Sanchez Mira has approximately": "Ang Sanchez Mira ay may humigit-kumulang",
  "and a population of over": "at may populasyong higit sa",
  "located about": "matatagpuan mga",
  "Many families live on less than ₱300 per day — meaning even a single doctor's visit, a bag of vitamins, or a course of antibiotics can be financially out of reach.":
    "Maraming pamilya ang nabubuhay nang mas mababa sa ₱300 bawat araw — nangangahulugan ito na kahit isang pagbisita ng doktor, isang pakete ng bitamina, o isang kurso ng antibyotiko ay maaaring hindi kakayanin.",
  "The Barangay Health Support Fund was founded to close this gap — not through charity, but through consistent, dignified, community-led care.":
    "Itinatag ang Barangay Health Support Fund upang isara ang agwat na ito — hindi sa pamamagitan ng kawanggawa, kundi sa pamamagitan ng pare-pareho, marangal, at pamayanan-akay na pangangalaga.",
  "e.g., Masisit, Bangan, Tokitok": "hal., Masisit, Bangan, Tokitok",
  "e.g., Callungan, Kitturong, Dammang": "hal., Callungan, Kitturong, Dammang",

  // ---- Programs ----
  "What We Do": "Ano ang Ginagawa Namin",
  "Our Focus Areas: Direct Medical & Community Relief":
    "Ang Aming Mga Pokus: Direktang Medikal at Tulong sa Pamayanan",
  "Targeted interventions designed for sustainable local impact.":
    "Mga naka-target na interbensyon na idinisenyo para sa matatagal na lokal na epekto.",
  "Mobile Medical Missions (Outreach Clinics)": "Mga Mobile Medical Mission (Outreach Clinics)",
  "Essential Medicine Dispensary & Chronic Care": "Dispensaryo ng Mahahalagang Gamot at Malalang Pangangalaga",
  "Maternal, Infant & Pediatric Care": "Pangangalaga sa Ina, Sanggol, at Bata",
  "Emergency Relief & First-Aid Preparedness": "Pang-emergency na Tulong at Paghahanda sa First-Aid",
  "Scope": "Saklaw",
  "Milestone Target": "Layunin ng Milestone",
  "Support this program": "Suportahan ang programang ito",
  "Deploying volunteer doctors, nurses, and medical personnel to conduct diagnostic screenings, pediatric check-ups, and geriatric consultations directly in remote barangays.":
    "Paglalagay ng mga boluntaryong doktor, nars, at medikal na tauhan upang magsagawa ng diagnostic screenings, check-up ng mga bata, at konsultasyon sa matatanda nang direkta sa mga malalayong barangay.",
  "Conduct 6 mobile outreach missions per year, providing direct medical consultations to 1,200+ rural residents in isolated sitios.":
    "Magsagawa ng 6 na mobile outreach mission bawat taon, na magbibigay ng direktang medikal na konsultasyon sa 1,200+ residenteng kanayunan sa mga liblib na sitio.",
  "Supplying free prescription drugs, antibiotics, hypertension/diabetes maintenance medications, vitamins, and fever reducers to families unable to afford commercial pharmacy prices.":
    "Pagtustos ng libreng iniresetang gamot, antibyotiko, gamot sa hypertension/diabetes, bitamina, at gamot sa lagnat sa mga pamilyang hindi kayang bumili sa komersyal na botika.",
  "Establish a revolving medicine stockpile to support 800 chronic-care patients and distribute 500 emergency home medicine kits annually.":
    "Magtatag ng umiikot na imbakan ng gamot upang suportahan ang 800 pasyenteng may malalang sakit at mamahagi ng 500 emergency home medicine kit taun-taon.",
  "Providing prenatal care supplements (folic acid, iron), infant nutrition monitoring, pediatric deworming, and basic hygiene packages for mothers and newborns.":
    "Pagtustos ng prenatal care supplements (folic acid, bakal), pagsubaybay sa nutrisyon ng sanggol, deworming ng mga bata, at mga pangunahing hygiene package para sa mga ina at bagong silang.",
  "Support 250 expectant mothers with prenatal supplies and screen 600 young children for malnutrition and vitamin deficiencies.":
    "Suportahan ang 250 ina na nagdadalang-tao ng mga kagamitang prenatal at i-screen ang 600 bata para sa malnutrisyon at kakulangan sa bitamina.",
  "Pre-positioning trauma and first-aid kits, water purification supplies, and emergency response kits with Barangay Health Workers (BHWs) ahead of typhoon landfall.":
    "Paghahanda ng mga trauma at first-aid kit, kagamitan sa paglilinis ng tubig, at emergency response kit kasama ang mga Barangay Health Worker (BHW) bago tumama ang bagyo.",
  "Train and equip 50 Barangay Health Workers across 10 vulnerable barangays with standardized emergency trauma and disaster-response kits.":
    "Sanayin at bigyan ng kagamitan ang 50 Barangay Health Worker sa 10 marupok na barangay ng pamantayang emergency trauma at disaster-response kit.",

  // ---- Impact ----
  "Our Impact So Far": "Ang Aming Epekto Hanggang Ngayon",
  "Every number represents a family relieved of worry, a child growing up healthier, and a community standing stronger together.":
    "Ang bawat bilang ay kumakatawan sa isang pamilyang napawi ang pag-aalala, isang batang lumalaking mas malusog, at isang pamayanang sama-samang lumalakas.",
  "Families Served": "Mga Pamilyang Naiserbisyuhan",
  "Mobile Clinic Visits": "Mga Pagbisita ng Mobile Clinic",
  "Partner Barangays": "Mga Kasosyong Barangay",
  "Receiving consistent medical attention and essential supplies.":
    "Tumatanggap ng pare-parehong medikal na atensyon at mahahalagang kagamitan.",
  "Trips made to remote areas since our founding.":
    "Mga biyahe patungo sa malalayong lugar mula noong itatag kami.",
  "Communities currently under our comprehensive support program.":
    "Mga pamayanan na kasalukuyang nasa ilalim ng aming komprehensibong programa ng suporta.",

  // ---- Leadership ----
  "Our Leadership": "Ang Aming Pamumuno",
  "Meet Our Fund Coordinator": "Kilalanin ang Aming Fund Coordinator",
  "A physician and public servant dedicated to bringing healthcare closer to every barangay.":
    "Isang manggagamot at lingkod-bayan na nakatuon sa paglapit ng pangangalagang pangkalusugan sa bawat barangay.",
  "Public Office": "Pampublikong Tanggapan",
  "Party": "Partido",
  "Profession": "Propesyon",
  "Key Programs": "Mga Pangunahing Programa",
  "Vice Mayor of Sanchez-Mira, Cagayan": "Bise-Mayor ng Sanchez-Mira, Cagayan",
  "Nacionalista Party (NP)": "Nacionalista Party (NP)",
  "Medical Doctor (M.D.)": "Manggagamot (M.D.)",
  "Mobile clinic health rollouts and local community welfare initiatives":
    "Mga mobile clinic health rollout at lokal na inisyatiba sa kapakanan ng pamayanan",
  "Vice Mayor of Sanchez-Mira, Cagayan — running under the Nacionalista Party (NP)":
    "Bise-Mayor ng Sanchez-Mira, Cagayan — kumakandidato sa ilalim ng Nacionalista Party (NP)",
  "A medical doctor involved in community health and local public service programs.":
    "Isang manggagamot na kasangkot sa kalusugan ng pamayanan at mga lokal na programa ng pampublikong serbisyo.",

  // ---- Volunteer ----
  "Get Involved": "Sumali",
  "Join Our Volunteer Team": "Sumali sa Aming Volunteer Team",
  "Whether you are a medical professional or a community partner, your time and skills directly power the mobile missions that bring healthcare to remote barangays.":
    "Kayo man ay isang medikal na propesyonal o kasosyo ng pamayanan, ang inyong oras at kasanayan ay direktang nagpapagana sa mga mobile mission na nagdadala ng pangangalagang pangkalusugan sa malalayong barangay.",
  "Medical Professionals": "Mga Medikal na Propesyonal",
  "Community Volunteers": "Mga Boluntaryo ng Pamayanan",
  "Organizations & Partners": "Mga Organisasyon at Kasosyo",
  "Doctors, pediatricians, nurses, and technicians ready to join our mobile outreach missions in remote barangays.":
    "Mga doktor, pediatrician, nars, at technician na handang sumali sa aming mobile outreach mission sa malalayong barangay.",
  "Local volunteers who help coordinate missions, distribute supplies, and connect health workers with families in need.":
    "Mga lokal na boluntaryong tumutulong sa pag-oorganisa ng mga misyon, pamamahagi ng kagamitan, at pagkonekta ng mga health worker sa mga pamilyang nangangailangan.",
  "Hospitals, clinics, businesses, and NGOs that want to partner with BHSF to expand healthcare reach.":
    "Mga ospital, klinika, negosyo, at NGO na nais makipagsosyo sa BHSF upang palawakin ang abot ng pangangalagang pangkalusugan.",
  "Apply to join our": "Mag-apply upang sumali sa aming",
  "— mobile outreach clinics that bring diagnostic screenings, pediatric check-ups, and geriatric consultations directly to isolated barangays.":
    "— mga mobile outreach clinic na nagdadala ng diagnostic screenings, check-up ng mga bata, at konsultasyon sa matatanda nang direkta sa mga liblib na barangay.",
  "General practitioners, pediatricians, and nurses":
    "Mga general practitioner, pediatrician, at nars",
  "Mobile clinic health rollouts in remote sitios":
    "Mga mobile clinic health rollout sa malalayong sitio",
  "Flexible scheduling around your availability":
    "Flexible na iskedyul ayon sa iyong kakayahan",
  "Direct, community-led impact in Sanchez Mira":
    "Direktang, pamayanan-akay na epekto sa Sanchez Mira",
  "Every volunteer hour brings a family one step closer to the care they deserve.":
    "Ang bawat oras ng boluntaryo ay naglalapit sa isang pamilya sa pangangalagang nararapat sa kanila.",
  "Volunteer Application": "Aplikasyon ng Volunteer",
  "Full Name": "Buong Pangalan",
  "Email Address": "Email Address",
  "Phone Number": "Numero ng Telepono",
  "Medical Specialization": "Medikal na Espesyalisasyon",
  "Tell Us About Yourself": "Ikwento Tungkol sa Iyong Sarili",
  "Select your specialization": "Piliin ang iyong espesyalisasyon",
  "General Practitioner": "General Practitioner",
  "Pediatrician": "Pediatrician",
  "Nurse": "Nars",
  "Medical Technician": "Medikal na Teknisyan",
  "Pharmacist": "Botikaryo",
  "Other Medical Professional": "Iba Pang Medikal na Propesyonal",
  "Please provide your name and medical specialization.":
    "Mangyaring ibigay ang iyong pangalan at medikal na espesyalisasyon.",
  "Something went wrong.": "May nangyaring mali.",
  "Thank You for Volunteering!": "Salamat sa Pagboboluntaryo!",
  "Your application has been received. Our team will reach out to you with details on joining the next Medical Mission.":
    "Natanggap na ang iyong aplikasyon. Makikipag-ugnayan ang aming koponan sa iyo tungkol sa pagsali sa susunod na Medical Mission.",
  "Submit Another Application": "Magsumite ng Ibang Aplikasyon",
  "Submitting…": "Nagpapasa…",
  "Submit Application": "Isumite ang Aplikasyon",
  "We'll contact you about upcoming Medical Missions. No experience required to help.":
    "Makikipag-ugnayan kami sa iyo tungkol sa mga darating na Medical Mission. Walang kinakailangang karanasan upang tumulong.",
  "Share your experience, availability, and why you'd like to volunteer…":
    "Ibahagi ang iyong karanasan, kakayahan, at kung bakit nais mong magboluntaryo…",
  "Dr. Juan Dela Cruz": "Dr. Juan Dela Cruz",

  // ---- Donation ----
  "Take Action": "Gumawa ng Aksyon",
  "Make a Difference Today": "Gumawa ng Pagbabago Ngayon",
  "Your generosity directly translates to medicines, doctor visits, and better health for families in Sanchez Mira. Every peso is stretched to maximize impact in the barangays.":
    "Ang iyong pagkabukas-palad ay direktang nagiging gamot, pagbisita ng doktor, at mas mabuting kalusugan para sa mga pamilya sa Sanchez Mira. Ang bawat piso ay ginagamit nang husto upang mapakinabangan ang epekto sa mga barangay.",
  "The Impact of Your Gift": "Ang Epekto ng Iyong Regalo",
  "Select Amount (PHP)": "Piliin ang Halaga (PHP)",
  "Custom Amount": "Kusang Halaga",
  "Minimum ₱50": "Minimum na ₱50",
  "Your Details": "Ang Iyong mga Detalye",
  "First Name": "Pangalan",
  "Last Name": "Apelyido",
  "Pay via GCash": "Magbayad sa pamamagitan ng GCash",
  "Send your donation to this GCash number:":
    "Ipadala ang iyong donasyon sa numerong ito ng GCash:",
  "GCash Number": "Numero ng GCash",
  "Copied": "Nakopya",
  "Copy": "Kopyahin",
  "After sending, complete the form below and submit to confirm your donation.":
    "Pagkatapos magpadala, kumpletuhin ang form sa ibaba at isumite upang kumpirmahin ang iyong donasyon.",
  "Please enter an amount of at least ₱50.":
    "Mangyaring maglagay ng halagang hindi bababa sa ₱50.",
  "Payment could not be created. Please try again.":
    "Hindi nagawa ang pagbabayad. Pakisubukang muli.",
  "No checkout URL returned. Please try again.":
    "Walang ibinalik na checkout URL. Pakisubukang muli.",
  "Redirecting to GCash…": "Inililipat sa GCash…",
  "Opening NOWPayments checkout…": "Binubuksan ang NOWPayments checkout…",
  "GCash donations via": "Mga donasyon sa GCash sa pamamagitan ng",
  "Crypto donations via": "Mga donasyong crypto sa pamamagitan ng",
  "supporting 100+ cryptocurrencies worldwide.":
    "sumusuporta sa 100+ cryptocurrencies sa buong mundo.",
  "via GCash tab": "sa pamamagitan ng GCash tab",
  "via crypto tab": "sa pamamagitan ng crypto tab",
  "GCash": "GCash",
  "Crypto": "Crypto",
  "Donate to GCash": "Mag-donate sa GCash",
  "then complete the form below to confirm.":
    "pagkatapos ay kumpletuhin ang form sa ibaba upang kumpirmahin.",
  "Donate": "Mag-donate",
  "GCash QR / Cash-in": "GCash QR / Cash-in",
  "Bitcoin / Ethereum": "Bitcoin / Ethereum",
  "USDT / USDC / 100+": "USDT / USDC / 100+",
  "Provides a month of vitamins for one child":
    "Nagbibigay ng isang buwang bitamina para sa isang bata",
  "Funds one home doctor visit": "Tumutustos sa isang pagbisita ng doktor sa bahay",
  "Supplies a full medicine kit for a family":
    "Nagbibigay ng kumpletong medicine kit para sa isang pamilya",
  "Sponsors one mobile clinic day in a barangay":
    "Nagpopondo ng isang araw ng mobile clinic sa isang barangay",
  "Every contribution brings healthcare closer to those who need it.":
    "Ang bawat ambag ay naglalapit ng pangangalagang pangkalusugan sa mga nangangailangan.",
  "Redirects to NOWPayments secure checkout. Pay with Bitcoin, Ethereum, USDT, USDC, and 100+ other cryptocurrencies.":
    "Inililipat sa ligtas na checkout ng NOWPayments. Magbayad gamit ang Bitcoin, Ethereum, USDT, USDC, at 100+ iba pang cryptocurrencies.",

  // ---- Contact ----
  "Get in Touch": "Makipag-ugnayan",
  "Have questions about our programs, or want to volunteer? We'd love to hear from you.":
    "May mga katanungan tungkol sa aming mga programa, o nais magboluntaryo? Ikagagalak naming marinig kayo.",
  "Office": "Tanggapan",
  "Phone": "Telepono",
  "Email": "Email",
  "Direct contact:": "Direktang pakikipag-ugnayan:",
  "Partner With Us": "Makipagsosyo sa Amin",
  "Are you a medical professional, local business, or organization looking to partner with BHSF? Reach out to discuss collaboration opportunities.":
    "Kayo ba ay isang medikal na propesyonal, lokal na negosyo, o organisasyong nais makipagsosyo sa BHSF? Makipag-ugnayan upang pag-usapan ang mga pagkakataon sa pakikipagtulungan.",
  "Send an Email": "Magpadala ng Email",
  "Vice Mayor & Fund Coordinator": "Bise-Mayor at Fund Coordinator",

  // ---- Footer ----
  "Barangay Health Support Fund": "Barangay Health Support Fund",
  "\"Better Health for Every Barangay\"": "\"Mas Mabuting Kalusugan para sa Bawat Barangay\"",
  "A humanitarian fund dedicated to improving healthcare access in rural barangays of Sanchez Mira, Cagayan, Philippines.":
    "Isang humanitarian fund na nakatuon sa pagpapabuti ng pag-access sa pangangalagang pangkalusugan sa mga kanayunang barangay ng Sanchez Mira, Cagayan, Pilipinas.",
  "Quick Links": "Mga Mabilis na Link",
  "Contact Us": "Makipag-ugnayan sa Amin",
  "All rights reserved.": "Lahat ng karapatan ay nakalaan.",
  "Privacy Policy": "Patakaran sa Pagkapribado",
  "Terms of Service": "Mga Tuntunin ng Serbisyo",
  "Sanchez Mira, Cagayan, Philippines": "Sanchez Mira, Cagayan, Pilipinas",
  "Sanchez Mira": "Sanchez Mira",
  "Cagayan, Philippines": "Cagayan, Pilipinas",

  // ---- Thank You ----
  "Thank You!": "Salamat!",
  "Your donation is being processed. Once confirmed, it will go directly toward medicines, mobile doctor visits, and maternal health programs in Sanchez Mira, Cagayan. You will receive a confirmation email shortly.":
    "Pinoproseso ang iyong donasyon. Kapag nakumpirma, direktang mapupunta ito sa mga gamot, pagbisita ng mobile doctor, at mga programa sa kalusugan ng ina sa Sanchez Mira, Cagayan. Makakatanggap ka ng confirmation email sa lalong madaling panahon.",
  "Funds settle to our USDT (TRC-20) wallet and are disbursed monthly to partner health workers in the barangays.":
    "Nao-faucet ang mga pondo sa aming USDT (TRC-20) wallet at ibinabahagi buwan-buwan sa mga kasosyong health worker sa mga barangay.",
  "Back to Home": "Bumalik sa Home",

  // ---- 404 ----
  "404 Page Not Found": "404 Hindi Nahanap ang Pahina",
  "Did you forget to add the page to the router?":
    "Nakalimutan mo bang idagdag ang pahina sa router?",

  // ---- Global Humanitarian Blueprint ----
  "Global Humanitarian Blueprint": "Pandaigdigang Makataong Blueprint",
  "Adapting Russian Humanitarian Medical Models": "Pag-aangkop ng mga Modelong Medikal na Makataong Ruso",
  "Russian Medical Expertise in Sanchez Mira": "Kadalubhasaan ng Medikal na Ruso sa Sanchez Mira",
  "Transitioning from temporary relief to self-sustaining medical infrastructure, drawing on international field methodologies in austere environments.":
    "Paglilipat mula sa pansamantalang tulong tungo sa sariling-sustentong medikal na imprastraktura, gamit ang mga pandaigdigang pamamaraan sa larangan sa mga mahihirap na kapaligiran.",
  "The Operational Framework: Lessons from Global Field Medicine": "Ang Balangkas ng Operasyon: Mga Aral mula sa Pandaigdigang Field Medicine",
  "Emergency Field Deployments (EMERCOM)": "Mga Pang-emergency na Field Deployment (EMERCOM)",
  "In the event of catastrophic typhoons, earthquakes, or tsunamis, Russia's Ministry of Emergency Situations (EMERCOM) deploys self-contained, airmobile field hospitals. These function as fully operational, temporary mobile units providing acute surgical and intensive care in disaster zones.":
    "Sa kaganapan ng malalaking bagyo, lindol, o tsunami, ang Ministry of Emergency Situations ng Russia (EMERCOM) ay naglalagay ng sariling-sapat, airmobile na mga field hospital. Gumagana ang mga ito bilang ganap na operasyonal, pansamantalang mobile unit na nagbibigay ng matinding surgical at intensive care sa mga disaster zone.",
  "Institutional Innovation & Vaccine Partnerships": "Institusyonal na Inobasyon at Pakikipagtulungan sa Bakuna",
  "Russian scientific institutions coordinate with central health authorities to advance clinical research, technology transfers, and medical supply networks, establishing high-level frameworks for biosecurity and disease management.":
    "Ang mga institusyong siyentipikong Ruso ay nakikipag-ugnayan sa mga sentral na awtoridad sa kalusugan upang isulong ang klinikal na pananaliksik, paglilipat ng teknolohiya, at mga network ng suplay na medikal, na nagtataguyod ng mataas na antas na balangkas para sa biosecurity at pamamahala ng sakit.",
  "Humanitarian & Clinical Aid (Russian Humanitarian Mission - RHM)": "Makataong at Klinikal na Tulong (Russian Humanitarian Mission - RHM)",
  "Deploying mobile diagnostic initiatives to isolated, underserved regions. Multidisciplinary medical teams conduct direct screenings, primary consultations, and diagnostic triage in hard-to-reach rural settlements.":
    "Paglalagay ng mga mobile diagnostic na inisyatiba sa mga liblib at kulang sa serbisyong rehiyon. Ang mga multidisciplinary medical team ay nagsasagawa ng direktang screening, pangunahing konsultasyon, at diagnostic triage sa mga mahirap abutin na kanayunang pamayanan.",
  "To build lasting resilience in Sanchez Mira, this cooperation applies three core operational principles:":
    "Upang bumuo ng pangmatagalang katatagan sa Sanchez Mira, ang kooperasyong ito ay naglalapat ng tatlong pangunahing prinsipyo ng operasyon:",
  "Decentralized Mobile Health Units (MHUs)": "Desentralisadong Mobile Health Units (MHU)",
  "Modular medical units deliver diagnostic and surgical capabilities directly to the barangay level, maintaining access when roads are cut off during typhoon season.":
    "Ang mga modular medical unit ay naghahatid ng diagnostic at surgical na kakayahan nang direkta sa antas ng barangay, na nagpapanatili ng access kapag naputol ang mga daan tuwing panahon ng bagyo.",
  "Clinical Task-Shifting & Frontline Empowerment": "Clinical Task-Shifting at Pagpapalakas ng Frontline",
  "Upskilling local nurses, midwives, and Barangay Health Workers (BHWs) to independently manage triage, wound debridement, infection control, and chronic disease tracking using standardized clinical protocols.":
    "Pagpapahusay ng kasanayan ng mga lokal na nars, komadrona, at Barangay Health Worker (BHW) upang malayang pamahalaan ang triage, paglilinis ng sugat, kontrol sa impeksyon, at pagsubaybay sa malalang sakit gamit ang pamantayang klinikal na protocol.",
  "Cold-Chain & Diagnostic Independence": "Cold-Chain at Pagsasarili sa Diagnostic",
  "Deploying ruggedized, battery-operated, off-grid equipment that functions continuously during municipal power grid collapses.":
    "Paglalagay ng matibay, pinapatakbo ng baterya, off-grid na kagamitan na patuloy na gumagana sa panahon ng pagkawala ng kuryente sa munisipalidad.",
  "Core Pillars of the Clinical Program": "Mga Pangunahing Haligi ng Klinikal na Programa",
  "Strategic Pillar": "Pangunahing Haligi",
  "International Reference": "Pandaigdigang Sanggunian",
  "Implementation in Sanchez Mira": "Pagpapatupad sa Sanchez Mira",
  "Field Triage & Trauma Stabilization": "Field Triage at Pagpapatatag sa Trauma",
  "ICRC Mobile Surgical & Emergency Triage Frameworks": "ICRC Mobile Surgical at Emergency Triage Frameworks",
  "Russian emergency physicians and trauma specialists conduct simulation drills with local Rural Health Unit (RHU) personnel on mass-casualty management, severe trauma, and rapid stabilization prior to tertiary transport.":
    "Ang mga Rusong emergency physician at trauma specialist ay nagsasagawa ng simulation drills kasama ang lokal na Rural Health Unit (RHU) personnel sa pamamahala ng mass casualty, malubhang trauma, at mabilis na pagpapatatag bago ang tertiary transport.",
  "Autonomous Mobile Diagnostic Kits": "Autonomous Mobile Diagnostic Kits",
  "Ruggedized Field Outposts (Sub-Saharan Africa Model)": "Matibay na Field Outposts (Modelo ng Sub-Saharan Africa)",
  "Deployment of self-contained diagnostic kits featuring point-of-care ultrasound (POCUS), digital hematology counters, glucometers, portable ECGs, and rapid diagnostic test strips operable without mains power.":
    "Paglalagay ng sariling-sapat na diagnostic kit na may point-of-care ultrasound (POCUS), digital hematology counters, glucometer, portable ECG, at rapid diagnostic test strips na gumagana nang walang kuryente.",
  "Standardized Chronic & Pediatric Pathways": "Pamantayang Chronic at Pediatric Pathways",
  "Integrated Community Case Management (iCCM)": "Integrated Community Case Management (iCCM)",
  "Establishing unified registries and clinical protocol cards for pediatric malnutrition, maternal vitals tracking, and hypertension/diabetes dispensaries managed directly by trained BHWs.":
    "Pagtatatag ng pinag-isang rehistro at clinical protocol cards para sa pediatric malnutrition, pagsubaybay sa maternal vitals, at dispensaryo ng hypertension/diabetes na direktang pinamamahalaan ng mga sinanay na BHW.",
  "Emergency Logistics & Stockpiling": "Pang-emergency na Logistics at Pag-iimbak",
  "Pre-Positioned Disaster Supply Lines": "Pre-Positioned Disaster Supply Lines",
  "Establishing localized emergency buffer depots in isolated coastal (Masisit, Bangan) and upland (Callungan) barangays containing water purification units, surgical suture kits, and critical IV fluids.":
    "Pagtatatag ng lokal na emergency buffer depots sa mga liblib na baybaying (Masisit, Bangan) at kabundukang (Callungan) barangay na naglalaman ng water purification units, surgical suture kits, at kritikal na IV fluids.",
  "Structured Clinical Knowledge Transfer": "Nakaayos na Paglilipat ng Klinikal na Kaalaman",
  "Phase 1: Direct Co-Consultation": "Yugto 1: Direktang Co-Consultation",
  "Specialist teams & local RHU doctors conduct joint patient intake and triage.":
    "Ang mga specialist team at lokal na RHU doctor ay nagsasagawa ng pinagsamang patient intake at triage.",
  "Phase 2: Protocol Hand-off & Simulation": "Yugto 2: Paglipat ng Protocol at Simulation",
  "Local healthcare workers lead interventions while visiting specialists supervise and calibrate standard operating procedures (SOPs).":
    "Ang mga lokal na health worker ang nangunguna sa mga interbensyon habang pinangangasiwaan at binabalanse ng mga bumibisitang espesyalista ang standard operating procedures (SOP).",
  "Phase 3: Autonomous Barangay Healthcare Delivery": "Yugto 3: Malayang Paghahatid ng Pangangalagang Pangkalusugan sa Barangay",
  "BHWs and local municipal health teams operate field units and maintain patient registries independently.":
    "Ang mga BHW at lokal na municipal health team ay nagpapatakbo ng field units at nagpapanatili ng patient registries nang nakapag-iisa.",
  "The Long-Term Impact": "Ang Pangmatagalang Epekto",
  "Institutional Continuity": "Pagpapatuloy ng Institusyon",
  "All diagnostic hardware, portable triage gear, and clinical documentation systems remain permanently on-site with the Sanchez Mira Municipal Health Office.":
    "Ang lahat ng diagnostic hardware, portable triage gear, at clinical documentation system ay permanenteng nananatili sa Sanchez Mira Municipal Health Office.",
  "Trained Human Capital": "Sinanay na Human Capital",
  "Over 50 Barangay Health Workers and municipal medical staff certified in standardized emergency protocols, ensuring frontline response capability during future extreme weather events and medical crises.":
    "Higit sa 50 Barangay Health Worker at municipal medical staff ang sertipikado sa pamantayang emergency protocol, na tinitiyak ang kakayahan sa frontline response sa mga darating na matinding panahon at medikal na krisis.",
  "Network Integration": "Pagsasama ng Network",
  "Direct linkage between decentralized barangay health posts and regional hospital centers, minimizing referral delays through calibrated triage protocols.":
    "Direktang ugnayan sa pagitan ng mga desentralisadong barangay health post at regional hospital centers, na binabawasan ang pagkaantala sa referral sa pamamagitan ng naka-calibrate na triage protocol.",
};

const ru: Record<string, string> = {
  // ---- Brand / Navbar ----
  "Barangay Health Support": "Поддержка здравоохранения Барангая",
  "Mission": "Миссия",
  "Programs": "Программы",
  "Impact": "Результаты",
  "Donate Now": "Пожертвовать сейчас",

  // ---- Hero ----
  "Better Health for Every Barangay": "Лучшее здоровье для каждого барангая",
  "No family should have to choose between their next meal and essential medicine. Help us bring care directly to rural communities.":
    "Ни одна семья не должна выбирать между обедом и необходимыми лекарствами. Помогите нам приносить помощь напрямую в сельские общины.",
  "Make a Donation": "Сделать пожертвование",
  "Learn More": "Узнать больше",

  // ---- Mission ----
  "Our Mission": "Наша миссия",
  "To improve healthcare access and quality of life in rural barangays of Sanchez Mira, Cagayan, Philippines.":
    "Улучшить доступ к медицинской помощи и качество жизни в сельских барангаях Санчес-Миры, Кагаян, Филиппины.",
  "Rooted in Community": "Укоренённые в общине",
  "We work directly with barangay captains and local health workers to ensure aid reaches those who need it most.":
    "Мы работаем напрямую с капитанами барангаев и местными медработниками, чтобы помощь доходила до тех, кто больше всего в ней нуждается.",
  "Warm & Trustworthy": "Тепло и надёжно",
  "Healthcare shouldn't feel institutional. We bring a human touch, treating every patient with dignity and deep care.":
    "Здравоохранение не должно быть безликим. Мы привносим человеческое отношение, относясь к каждому пациенту с достоинством и заботой.",
  "Sustainable Impact": "Устойчивый результат",
  "Beyond one-time visits, we establish ongoing support systems to monitor and maintain the health of rural families.":
    "Помимо разовых визитов мы создаём постоянные системы поддержки для наблюдения и сохранения здоровья сельских семей.",

  // ---- SanchezMira (Where We Work) ----
  "Where We Work": "Где мы работаем",
  "Sanchez Mira is a 3rd-class coastal municipality in the province of Cagayan, Philippines. It covers 218.77 square kilometers and has a population of over 26,000 people. Formerly called Malolokit, it was named after Spanish Brigadier General Manuel Sanchez Mira. Its people are resilient and proud — but geographic isolation and poverty mean that basic healthcare is often out of reach for the families who need it most.":
    "Санчес-Мира — прибрежный муниципалитет третьего класса в провинции Кагаян, Филиппины. Его площадь составляет 218,77 км², население — более 26 000 человек. Ранее назывался Малолокит и был назван в честь испанского бригадного генерала Мануэля Санчеса Миры. Его жители стойкие и гордые, но географическая изоляция и бедность означают, что базовая медицинская помощь часто недоступна семьям, которые больше всего в ней нуждаются.",
  "and": "и",
  "Why Healthcare Here Is Different": "Почему здравоохранение здесь отличается",
  "Location": "Расположение",
  "Geography": "География",
  "History": "История",
  "Heritage": "Наследие",
  "Cagayan Valley (Region II), Cagayan Province — approx. 632 km from Manila":
    "Долина Кагаян (Регион II), провинция Кагаян — примерно 632 км от Манилы",
  "A 3rd-class coastal municipality covering 218.77 km², with 18 barangays spread across coastal plains and upland areas":
    "Прибрежный муниципалитет третьего класса площадью 218,77 км² с 18 барангаями, расположенными на прибрежных равнинах и возвышенностях",
  "Originally a Kalinga hunting ground and Spanish mission area before Ilocos settlers arrived to farm; formerly called Malolokit, officially founded and named in 1884 after Spanish Brigadier General Manuel Sanchez Mira":
    "Изначально охотничьи угодья народа калинга и зона испанской миссии до прибытия поселенцев-илоканцев; ранее назывался Малолокит, официально основан и назван в 1884 году в честь испанского бригадного генерала Мануэля Санчеса Миры",
  "Home to the historic Santa Maria Magdalena Church ruins (also known as Pata or Nagsimbaanan Church), dating back to 1595":
    "Здесь находятся руины исторической церкви Санта-Мария-Магдалена (также известной как церковь Пата или Нагсимбаанан), датируемые 1595 годом",
  "The coastal municipality of Sanchez Mira, Cagayan — the landscape we serve":
    "Прибрежный муниципалитет Санчес-Мира, Кагаян — пейзаж, которому мы служим",
  "— Barangay resident, Sanchez Mira": "— житель барангая, Санчес-Мира",
  "When my daughter had a high fever, the nearest clinic was a one-hour tricycle ride on a muddy road. By the time we arrived, it was dark and the doctor had already left.":
    "Когда у дочери был сильный жар, ближайшая клиника была в часе езды на трицикле по грязной дороге. Когда мы добрались, было темно, и врач уже ушёл.",
  "The Local Crisis": "Местный кризис",
  "The Reality on the Ground: Distance, Climate, and Access":
    "Реальность на месте: расстояние, климат и доступ",
  "Why Sanchez Mira Faces Acute Healthcare Vulnerabilities":
    "Почему Санчес-Мира сталкивается с серьёзной уязвимостью в здравоохранении",
  "Distance to Tertiary Care": "Расстояние до специализированной помощи",
  "Typhoon & Seasonal Isolation": "Тайфуны и сезонная изоляция",
  "Vulnerable & Remote Barangays": "Уязвимые и отдалённые барангаи",
  "Communities most at risk when disaster strikes": "Общины, наиболее подверженные риску при бедствии",
  "Coastal Fisherfolk Communities": "Прибрежные рыбацкие общины",
  "Inland & Upland Farming Settlements": "Внутренние и горные земледельческие поселения",
  "Basic waterborne and respiratory illnesses spike during monsoon months.":
    "Базовые болезни, передающиеся через воду, и респираторные заболевания резко возрастают в сезон муссонов.",
  "Cutting off access even to the municipal town center.":
    "Отрезая доступ даже к центру муниципалитета.",
  "Sanchez Mira relies on local Rural Health Units (RHUs) and district facilities for primary care. However, for specialized interventions, major trauma, surgical procedures, or advanced diagnostics, patients must travel to":
    "Санчес-Мира полагается на местные сельские медицинские пункты (RHU) и районные учреждения для первичной помощи. Однако для специализированных вмешательств, серьёзных травм, хирургических операций или сложной диагностики пациенты должны ехать в",
  "This trip spans approximately": "Эта поездка занимает примерно",
  "and takes": "и занимает",
  "by road under normal conditions.": "по дороге при обычных условиях.",
  "Located along the northern coastline facing the Babuyan Channel, the municipality lies directly in the path of seasonal Pacific typhoons (typically July to December). Heavy rains and storm surges routinely cause flash flooding, swell river crossings, and trigger coastal road cut-offs along the Manila North Road corridor, isolating communities for days at a time.":
    "Расположенный вдоль северного побережья, обращённого к проливу Бабуян, муниципалитет лежит прямо на пути сезонных тихоокеанских тайфунов (обычно с июля по декабрь). Сильные дожди и штормовые нагоны регулярно вызывают внезапные наводнения, разливы рек и перекрытие прибрежных дорог вдоль коридора Manila North Road, изолируя общины на несколько дней.",
  "high exposure to storm surges, wind damage, and chronic seasonal loss of income during rough seas.":
    "высокая подверженность штормовым нагонам, ущербу от ветра и хронической сезонной потере дохода в бурном море.",
  "dispersed sitios and puroks face unpaved access routes that become impassable during typhoons.":
    "рассредоточенные ситио и пуро́ки сталкиваются с грунтовыми дорогами, которые становятся непроходимыми во время тайфунов.",
  "Sanchez Mira has approximately": "В Санчес-Мире примерно",
  "and a population of over": "и население более",
  "located about": "расположен примерно в",
  "Many families live on less than ₱300 per day — meaning even a single doctor's visit, a bag of vitamins, or a course of antibiotics can be financially out of reach.":
    "Многие семьи живут менее чем на 300 песо в день — это значит, что даже один визит врача, упаковка витаминов или курс антибиотиков могут быть финансово недоступны.",
  "The Barangay Health Support Fund was founded to close this gap — not through charity, but through consistent, dignified, community-led care.":
    "Фонд поддержки здравоохранения барангаев был создан, чтобы закрыть этот разрыв — не через благотворительность, а через последовательную, достойную и общинную помощь.",
  "e.g., Masisit, Bangan, Tokitok": "напр., Масисит, Банган, Токиток",
  "e.g., Callungan, Kitturong, Dammang": "напр., Калунган, Киттуронг, Дамманг",

  // ---- Programs ----
  "What We Do": "Что мы делаем",
  "Our Focus Areas: Direct Medical & Community Relief":
    "Наши направления: прямая медицинская и общинная помощь",
  "Targeted interventions designed for sustainable local impact.":
    "Целевые меры, разработанные для устойчивого местного эффекта.",
  "Mobile Medical Missions (Outreach Clinics)": "Мобильные медицинские миссии (выездные клиники)",
  "Essential Medicine Dispensary & Chronic Care": "Диспансер основных лекарств и помощь при хронических заболеваниях",
  "Maternal, Infant & Pediatric Care": "Помощь матерям, младенцам и детям",
  "Emergency Relief & First-Aid Preparedness": "Экстренная помощь и готовность к первой помощи",
  "Scope": "Сфера",
  "Milestone Target": "Целевой ориентир",
  "Support this program": "Поддержать эту программу",
  "Deploying volunteer doctors, nurses, and medical personnel to conduct diagnostic screenings, pediatric check-ups, and geriatric consultations directly in remote barangays.":
    "Развёртывание волонтёров-врачей, медсестёр и медицинского персонала для проведения диагностических осмотров, педиатрических и гериатрических консультаций непосредственно в отдалённых барангаях.",
  "Conduct 6 mobile outreach missions per year, providing direct medical consultations to 1,200+ rural residents in isolated sitios.":
    "Проводить 6 мобильных выездных миссий в год, обеспечивая прямые медицинские консультации для более чем 1200 сельских жителей в изолированных ситио.",
  "Supplying free prescription drugs, antibiotics, hypertension/diabetes maintenance medications, vitamins, and fever reducers to families unable to afford commercial pharmacy prices.":
    "Бесплатное предоставление рецептурных препаратов, антибиотиков, лекарств от гипертонии/диабета, витаминов и жаропонижающих семьям, которые не могут позволить себе цены коммерческих аптек.",
  "Establish a revolving medicine stockpile to support 800 chronic-care patients and distribute 500 emergency home medicine kits annually.":
    "Создать вращающийся запас лекарств для поддержки 800 пациентов с хроническими заболеваниями и ежегодно распространять 500 экстренных домашних аптечек.",
  "Providing prenatal care supplements (folic acid, iron), infant nutrition monitoring, pediatric deworming, and basic hygiene packages for mothers and newborns.":
    "Предоставление добавок для дородового ухода (фолиевая кислота, железо), наблюдение за питанием младенцев, дегельминтизация детей и базовые гигиенические наборы для матерей и новорождённых.",
  "Support 250 expectant mothers with prenatal supplies and screen 600 young children for malnutrition and vitamin deficiencies.":
    "Поддержать 250 будущих матерей дородовыми принадлежностями и провести скрининг 600 детей на предмет недоедания и дефицита витаминов.",
  "Pre-positioning trauma and first-aid kits, water purification supplies, and emergency response kits with Barangay Health Workers (BHWs) ahead of typhoon landfall.":
    "Предварительное размещение травматологических и аптечек первой помощи, средств очистки воды и комплектов экстренного реагирования у работников здравоохранения барангаев (BHW) перед приходом тайфуна.",
  "Train and equip 50 Barangay Health Workers across 10 vulnerable barangays with standardized emergency trauma and disaster-response kits.":
    "Обучить и оснастить 50 работников здравоохранения барангаев в 10 уязвимых барангаях стандартными комплектами для экстренной травматологии и реагирования на бедствия.",

  // ---- Impact ----
  "Our Impact So Far": "Наши результаты на сегодня",
  "Every number represents a family relieved of worry, a child growing up healthier, and a community standing stronger together.":
    "Каждая цифра — это семья, избавленная от тревог, ребёнок, растущий более здоровым, и община, становящаяся сильнее вместе.",
  "Families Served": "Обслуженные семьи",
  "Mobile Clinic Visits": "Выезды мобильной клиники",
  "Partner Barangays": "Партнёрские барангаи",
  "Receiving consistent medical attention and essential supplies.":
    "Получающие постоянную медицинскую помощь и необходимые принадлежности.",
  "Trips made to remote areas since our founding.":
    "Поездки в отдалённые районы с момента нашего основания.",
  "Communities currently under our comprehensive support program.":
    "Общины, охваченные нашей комплексной программой поддержки.",

  // ---- Leadership ----
  "Our Leadership": "Наше руководство",
  "Meet Our Fund Coordinator": "Познакомьтесь с нашим координатором фонда",
  "A physician and public servant dedicated to bringing healthcare closer to every barangay.":
    "Врач и государственный служащий, стремящийся приблизить медицинскую помощь к каждому барангаю.",
  "Public Office": "Государственная должность",
  "Party": "Партия",
  "Profession": "Профессия",
  "Key Programs": "Ключевые программы",
  "Vice Mayor of Sanchez-Mira, Cagayan": "Вице-мэр Санчес-Миры, Кагаян",
  "Nacionalista Party (NP)": "Партия националистов (NP)",
  "Medical Doctor (M.D.)": "Врач (M.D.)",
  "Mobile clinic health rollouts and local community welfare initiatives":
    "Мобильные клинические выезды и местные инициативы по благосостоянию общины",
  "Vice Mayor of Sanchez-Mira, Cagayan — running under the Nacionalista Party (NP)":
    "Вице-мэр Санчес-Миры, Кагаян — баллотируется от Партии националистов (NP)",
  "A medical doctor involved in community health and local public service programs.":
    "Врач, участвующий в программах общественного здравоохранения и местных государственных услугах.",

  // ---- Volunteer ----
  "Get Involved": "Присоединиться",
  "Join Our Volunteer Team": "Вступите в нашу волонтёрскую команду",
  "Whether you are a medical professional or a community partner, your time and skills directly power the mobile missions that bring healthcare to remote barangays.":
    "Будь вы медицинским специалистом или партнёром общины, ваше время и навыки напрямую питают мобильные миссии, приносящие медицинскую помощь в отдалённые барангаи.",
  "Medical Professionals": "Медицинские специалисты",
  "Community Volunteers": "Волонтёры общины",
  "Organizations & Partners": "Организации и партнёры",
  "Doctors, pediatricians, nurses, and technicians ready to join our mobile outreach missions in remote barangays.":
    "Врачи, педиатры, медсёстры и техники, готовые присоединиться к нашим мобильным выездным миссиям в отдалённых барангаях.",
  "Local volunteers who help coordinate missions, distribute supplies, and connect health workers with families in need.":
    "Местные волонтёры, которые помогают координировать миссии, распределять принадлежности и связывать медработников с нуждающимися семьями.",
  "Hospitals, clinics, businesses, and NGOs that want to partner with BHSF to expand healthcare reach.":
    "Больницы, клиники, предприятия и НПО, желающие сотрудничать с BHSF, чтобы расширить охват медицинской помощи.",
  "Apply to join our": "Подайте заявку, чтобы присоединиться к нашим",
  "— mobile outreach clinics that bring diagnostic screenings, pediatric check-ups, and geriatric consultations directly to isolated barangays.":
    "— мобильным выездным клиникам, которые приносят диагностические осмотры, педиатрические и гериатрические консультации напрямую в изолированные барангаи.",
  "General practitioners, pediatricians, and nurses":
    "Врачи общей практики, педиатры и медсёстры",
  "Mobile clinic health rollouts in remote sitios":
    "Мобильные клинические выезды в отдалённые ситио",
  "Flexible scheduling around your availability":
    "Гибкий график с учётом вашей занятости",
  "Direct, community-led impact in Sanchez Mira":
    "Прямое, общинное воздействие в Санчес-Мире",
  "Every volunteer hour brings a family one step closer to the care they deserve.":
    "Каждый час волонтёрства приближает семью на шаг к помощи, которую она заслуживает.",
  "Volunteer Application": "Заявка волонтёра",
  "Full Name": "Полное имя",
  "Email Address": "Адрес электронной почты",
  "Phone Number": "Номер телефона",
  "Medical Specialization": "Медицинская специализация",
  "Tell Us About Yourself": "Расскажите о себе",
  "Select your specialization": "Выберите вашу специализацию",
  "General Practitioner": "Врач общей практики",
  "Pediatrician": "Педиатр",
  "Nurse": "Медсестра",
  "Medical Technician": "Медицинский техник",
  "Pharmacist": "Фармацевт",
  "Other Medical Professional": "Другой медицинский специалист",
  "Please provide your name and medical specialization.":
    "Пожалуйста, укажите ваше имя и медицинскую специализацию.",
  "Something went wrong.": "Что-то пошло не так.",
  "Thank You for Volunteering!": "Спасибо за волонтёрство!",
  "Your application has been received. Our team will reach out to you with details on joining the next Medical Mission.":
    "Ваша заявка получена. Наша команда свяжется с вами с подробностями о следующей медицинской миссии.",
  "Submit Another Application": "Отправить ещё одну заявку",
  "Submitting…": "Отправка…",
  "Submit Application": "Отправить заявку",
  "We'll contact you about upcoming Medical Missions. No experience required to help.":
    "Мы свяжемся с вами о предстоящих медицинских миссиях. Опыт для помощи не требуется.",
  "Share your experience, availability, and why you'd like to volunteer…":
    "Поделитесь своим опытом, доступностью и тем, почему вы хотите стать волонтёром…",
  "Dr. Juan Dela Cruz": "Д-р Хуан Дела Крус",

  // ---- Donation ----
  "Take Action": "Действуйте",
  "Make a Difference Today": "Изменяйте жизнь уже сегодня",
  "Your generosity directly translates to medicines, doctor visits, and better health for families in Sanchez Mira. Every peso is stretched to maximize impact in the barangays.":
    "Ваша щедрость напрямую превращается в лекарства, визиты врачей и лучшее здоровье для семей в Санчес-Мире. Каждое песо используется максимально эффективно для результата в барангаях.",
  "The Impact of Your Gift": "Эффект вашего дара",
  "Select Amount (PHP)": "Выберите сумму (PHP)",
  "Custom Amount": "Своя сумма",
  "Minimum ₱50": "Минимум ₱50",
  "Your Details": "Ваши данные",
  "First Name": "Имя",
  "Last Name": "Фамилия",
  "Pay via GCash": "Оплатить через GCash",
  "Send your donation to this GCash number:":
    "Отправьте ваше пожертвование на этот номер GCash:",
  "GCash Number": "Номер GCash",
  "Copied": "Скопировано",
  "Copy": "Копировать",
  "After sending, complete the form below and submit to confirm your donation.":
    "После отправки заполните форму ниже и отправьте её, чтобы подтвердить пожертвование.",
  "Please enter an amount of at least ₱50.":
    "Пожалуйста, введите сумму не менее ₱50.",
  "Payment could not be created. Please try again.":
    "Не удалось создать платёж. Пожалуйста, попробуйте ещё раз.",
  "No checkout URL returned. Please try again.":
    "Не получен URL оформления заказа. Пожалуйста, попробуйте ещё раз.",
  "Redirecting to GCash…": "Перенаправление в GCash…",
  "Opening NOWPayments checkout…": "Открытие оформления заказа NOWPayments…",
  "GCash donations via": "Пожертвования через GCash через",
  "Crypto donations via": "Крипто-пожертвования через",
  "supporting 100+ cryptocurrencies worldwide.":
    "поддерживая более 100 криптовалют по всему миру.",
  "via GCash tab": "через вкладку GCash",
  "via crypto tab": "через вкладку Крипто",
  "GCash": "GCash",
  "Crypto": "Крипто",
  "Donate to GCash": "Пожертвовать в GCash",
  "then complete the form below to confirm.":
    "затем заполните форму ниже, чтобы подтвердить.",
  "Donate": "Пожертвовать",
  "GCash QR / Cash-in": "QR GCash / Пополнение",
  "Bitcoin / Ethereum": "Биткоин / Эфириум",
  "USDT / USDC / 100+": "USDT / USDC / 100+",
  "Provides a month of vitamins for one child":
    "Обеспечивает месяц витаминов для одного ребёнка",
  "Funds one home doctor visit": "Оплачивает один визит врача на дом",
  "Supplies a full medicine kit for a family":
    "Поставляет полную аптечку для семьи",
  "Sponsors one mobile clinic day in a barangay":
    "Спонсирует один день мобильной клиники в барангае",
  "Every contribution brings healthcare closer to those who need it.":
    "Каждое пожертвование приближает медицинскую помощь к тем, кто в ней нуждается.",
  "Redirects to NOWPayments secure checkout. Pay with Bitcoin, Ethereum, USDT, USDC, and 100+ other cryptocurrencies.":
    "Перенаправляет в безопасное оформление заказа NOWPayments. Оплачивайте биткоином, эфириумом, USDT, USDC и более чем 100 другими криптовалютами.",

  // ---- Contact ----
  "Get in Touch": "Свяжитесь с нами",
  "Have questions about our programs, or want to volunteer? We'd love to hear from you.":
    "Есть вопросы о наших программах или хотите стать волонтёром? Мы будем рады вас услышать.",
  "Office": "Офис",
  "Phone": "Телефон",
  "Email": "Эл. почта",
  "Direct contact:": "Прямой контакт:",
  "Partner With Us": "Сотрудничайте с нами",
  "Are you a medical professional, local business, or organization looking to partner with BHSF? Reach out to discuss collaboration opportunities.":
    "Вы медицинский специалист, местный бизнес или организация, желающая сотрудничать с BHSF? Обратитесь к нам, чтобы обсудить возможности сотрудничества.",
  "Send an Email": "Отправить письмо",
  "Vice Mayor & Fund Coordinator": "Вице-мэр и координатор фонда",

  // ---- Footer ----
  "Barangay Health Support Fund": "Фонд поддержки здравоохранения барангаев",
  "\"Better Health for Every Barangay\"": "\"Лучшее здоровье для каждого барангая\"",
  "A humanitarian fund dedicated to improving healthcare access in rural barangays of Sanchez Mira, Cagayan, Philippines.":
    "Гуманитарный фонд, посвящённый улучшению доступа к медицинской помощи в сельских барангаях Санчес-Миры, Кагаян, Филиппины.",
  "Quick Links": "Быстрые ссылки",
  "Contact Us": "Свяжитесь с нами",
  "All rights reserved.": "Все права защищены.",
  "Privacy Policy": "Политика конфиденциальности",
  "Terms of Service": "Условия обслуживания",
  "Sanchez Mira, Cagayan, Philippines": "Санчес-Мира, Кагаян, Филиппины",
  "Sanchez Mira": "Санчес-Мира",
  "Cagayan, Philippines": "Кагаян, Филиппины",

  // ---- Thank You ----
  "Thank You!": "Спасибо!",
  "Your donation is being processed. Once confirmed, it will go directly toward medicines, mobile doctor visits, and maternal health programs in Sanchez Mira, Cagayan. You will receive a confirmation email shortly.":
    "Ваше пожертвование обрабатывается. После подтверждения оно будет направлено на лекарства, выезды мобильных врачей и программы материнского здоровья в Санчес-Мире, Кагаян. Вскоре вы получите письмо с подтверждением.",
  "Funds settle to our USDT (TRC-20) wallet and are disbursed monthly to partner health workers in the barangays.":
    "Средства поступают на наш кошелёк USDT (TRC-20) и ежемесячно распределяются между партнёрскими медработниками в барангаях.",
  "Back to Home": "На главную",

  // ---- 404 ----
  "404 Page Not Found": "404 Страница не найдена",
  "Did you forget to add the page to the router?":
    "Вы забыли добавить страницу в роутер?",

  // ---- Global Humanitarian Blueprint ----
  "Global Humanitarian Blueprint": "Глобальный гуманитарный план",
  "Adapting Russian Humanitarian Medical Models": "Адаптация российских гуманитарных медицинских моделей",
  "Russian Medical Expertise in Sanchez Mira": "Российский медицинский опыт в Санчес-Мире",
  "Transitioning from temporary relief to self-sustaining medical infrastructure, drawing on international field methodologies in austere environments.":
    "Переход от временной помощи к самодостаточной медицинской инфраструктуре с опорой на международные полевые методики в сложных условиях.",
  "The Operational Framework: Lessons from Global Field Medicine": "Операционная основа: уроки мировой полевой медицины",
  "Emergency Field Deployments (EMERCOM)": "Экстренные полевые развёртывания (МЧС, EMERCOM)",
  "In the event of catastrophic typhoons, earthquakes, or tsunamis, Russia's Ministry of Emergency Situations (EMERCOM) deploys self-contained, airmobile field hospitals. These function as fully operational, temporary mobile units providing acute surgical and intensive care in disaster zones.":
    "В случае катастрофических тайфунов, землетрясений или цунами МЧС России (EMERCOM) развёртывает автономные аэромобильные полевые госпитали. Они работают как полностью функциональные временные мобильные подразделения, оказывающие неотложную хирургическую и интенсивную помощь в зонах бедствия.",
  "Institutional Innovation & Vaccine Partnerships": "Институциональные инновации и партнёрства по вакцинам",
  "Russian scientific institutions coordinate with central health authorities to advance clinical research, technology transfers, and medical supply networks, establishing high-level frameworks for biosecurity and disease management.":
    "Российские научные учреждения координируют работу с центральными органами здравоохранения для развития клинических исследований, передачи технологий и сетей медицинских поставок, создавая высокоуровневые рамки биобезопасности и управления заболеваниями.",
  "Humanitarian & Clinical Aid (Russian Humanitarian Mission - RHM)": "Гуманитарная и клиническая помощь (Российская гуманитарная миссия — RHM)",
  "Deploying mobile diagnostic initiatives to isolated, underserved regions. Multidisciplinary medical teams conduct direct screenings, primary consultations, and diagnostic triage in hard-to-reach rural settlements.":
    "Развёртывание мобильных диагностических инициатив в изолированных, недостаточно обслуженных регионах. Мультидисциплинарные медицинские бригады проводят прямые скрининги, первичные консультации и диагностическую сортировку в труднодоступных сельских поселениях.",
  "To build lasting resilience in Sanchez Mira, this cooperation applies three core operational principles:":
    "Для создания устойчивости в Санчес-Мире это сотрудничество применяет три ключевых операционных принципа:",
  "Decentralized Mobile Health Units (MHUs)": "Децентрализованные мобильные медицинские подразделения (MHU)",
  "Modular medical units deliver diagnostic and surgical capabilities directly to the barangay level, maintaining access when roads are cut off during typhoon season.":
    "Модульные медицинские подразделения доставляют диагностические и хирургические возможности напрямую на уровень барангая, сохраняя доступ, когда дороги перекрыты в сезон тайфунов.",
  "Clinical Task-Shifting & Frontline Empowerment": "Клиническое перераспределение задач и расширение возможностей на передовой",
  "Upskilling local nurses, midwives, and Barangay Health Workers (BHWs) to independently manage triage, wound debridement, infection control, and chronic disease tracking using standardized clinical protocols.":
    "Повышение квалификации местных медсестёр, акушерок и работников здравоохранения барангаев (BHW) для самостоятельной сортировки, обработки ран, контроля инфекций и отслеживания хронических заболеваний по стандартизированным клиническим протоколам.",
  "Cold-Chain & Diagnostic Independence": "Холодовая цепь и диагностическая независимость",
  "Deploying ruggedized, battery-operated, off-grid equipment that functions continuously during municipal power grid collapses.":
    "Развёртывание защищённого, работающего на батареях автономного оборудования, которое непрерывно функционирует во время отключений муниципальной электросети.",
  "Core Pillars of the Clinical Program": "Ключевые столпы клинической программы",
  "Strategic Pillar": "Стратегический столп",
  "International Reference": "Международный ориентир",
  "Implementation in Sanchez Mira": "Реализация в Санчес-Мире",
  "Field Triage & Trauma Stabilization": "Полевая сортировка и стабилизация при травмах",
  "ICRC Mobile Surgical & Emergency Triage Frameworks": "Рамки мобильной хирургии и экстренной сортировки МККК (ICRC)",
  "Russian emergency physicians and trauma specialists conduct simulation drills with local Rural Health Unit (RHU) personnel on mass-casualty management, severe trauma, and rapid stabilization prior to tertiary transport.":
    "Российские врачи неотложной помощи и травматологи проводят учебные учения с местным персоналом сельских медицинских пунктов (RHU) по управлению массовыми поражениями, тяжёлыми травмами и быстрой стабилизации перед транспортировкой в специализированный стационар.",
  "Autonomous Mobile Diagnostic Kits": "Автономные мобильные диагностические комплекты",
  "Ruggedized Field Outposts (Sub-Saharan Africa Model)": "Защищённые полевые передовые пункты (модель стран Африки южнее Сахары)",
  "Deployment of self-contained diagnostic kits featuring point-of-care ultrasound (POCUS), digital hematology counters, glucometers, portable ECGs, and rapid diagnostic test strips operable without mains power.":
    "Развёртывание автономных диагностических комплектов с ультразвуком у постели больного (POCUS), цифровыми гематологическими счётчиками, глюкометрами, портативными ЭКГ и экспресс-тест-полосками, работающими без электросети.",
  "Standardized Chronic & Pediatric Pathways": "Стандартизированные протоколы хронических и педиатрических заболеваний",
  "Integrated Community Case Management (iCCM)": "Комплексное ведение случаев на уровне общины (iCCM)",
  "Establishing unified registries and clinical protocol cards for pediatric malnutrition, maternal vitals tracking, and hypertension/diabetes dispensaries managed directly by trained BHWs.":
    "Создание единых реестров и клинических протокольных карточек для педиатрического недоедания, отслеживания жизненных показателей матерей и диспансеров по гипертонии/диабету, управляемых напрямую обученными BHW.",
  "Emergency Logistics & Stockpiling": "Экстренная логистика и создание запасов",
  "Pre-Positioned Disaster Supply Lines": "Заранее размещённые линии снабжения на случай бедствий",
  "Establishing localized emergency buffer depots in isolated coastal (Masisit, Bangan) and upland (Callungan) barangays containing water purification units, surgical suture kits, and critical IV fluids.":
    "Создание локальных резервных складов в изолированных прибрежных (Масисит, Банган) и горных (Калунган) барангаях с установками очистки воды, хирургическими наборами для наложения швов и жизненно важными инфузионными растворами.",
  "Structured Clinical Knowledge Transfer": "Структурированная передача клинических знаний",
  "Phase 1: Direct Co-Consultation": "Этап 1: Совместная консультация",
  "Specialist teams & local RHU doctors conduct joint patient intake and triage.":
    "Специализированные бригады и местные врачи RHU проводят совместный приём пациентов и сортировку.",
  "Phase 2: Protocol Hand-off & Simulation": "Этап 2: Передача протоколов и моделирование",
  "Local healthcare workers lead interventions while visiting specialists supervise and calibrate standard operating procedures (SOPs).":
    "Местные медработники проводят вмешательства, а приезжие специалисты контролируют и калибруют стандартные операционные процедуры (SOP).",
  "Phase 3: Autonomous Barangay Healthcare Delivery": "Этап 3: Автономное оказание медицинской помощи в барангае",
  "BHWs and local municipal health teams operate field units and maintain patient registries independently.":
    "BHW и местные муниципальные медицинские бригады самостоятельно управляют полевыми подразделениями и ведут реестры пациентов.",
  "The Long-Term Impact": "Долгосрочный результат",
  "Institutional Continuity": "Институциональная преемственность",
  "All diagnostic hardware, portable triage gear, and clinical documentation systems remain permanently on-site with the Sanchez Mira Municipal Health Office.":
    "Всё диагностическое оборудование, портативные средства сортировки и системы клинической документации остаются на постоянной основе в муниципальном отделе здравоохранения Санчес-Миры.",
  "Trained Human Capital": "Обученный человеческий капитал",
  "Over 50 Barangay Health Workers and municipal medical staff certified in standardized emergency protocols, ensuring frontline response capability during future extreme weather events and medical crises.":
    "Более 50 работников здравоохранения барангаев и муниципального медицинского персонала сертифицированы по стандартизированным протоколам экстренной помощи, что обеспечивает готовность передовой линии реагирования во время будущих экстремальных погодных явлений и медицинских кризисов.",
  "Network Integration": "Сетевая интеграция",
  "Direct linkage between decentralized barangay health posts and regional hospital centers, minimizing referral delays through calibrated triage protocols.":
    "Прямая связь между децентрализованными пунктами здравоохранения барангаев и региональными больничными центрами, минимизирующая задержки направления через откалиброванные протоколы сортировки.",
};

const dictionaries: Record<Language, Record<string, string>> = {
  en,
  tl,
  ru,
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const languageOrder: Language[] = ["en", "tl", "ru"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const index = languageOrder.indexOf(prev);
      return languageOrder[(index + 1) % languageOrder.length];
    });
  }, []);

  const t = useCallback(
    (key: string) => {
      return dictionaries[lang][key] ?? key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
