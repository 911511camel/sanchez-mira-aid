import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "en" | "tl";

const translations: Record<string, string> = {
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
  "Donate": "Mag-donate",
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

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === "en" ? "tl" : "en"));
  }, []);

  const t = useCallback(
    (key: string) => {
      if (lang === "en") return key;
      return translations[key] ?? key;
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
