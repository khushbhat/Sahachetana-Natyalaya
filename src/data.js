// Editable content. [VERIFY] = confirm against original documents.
export const PAGES=['Home','Founders','Classes','Programs','Annual Events','Awards & Recognition','Contact Us'];
export const founders=[
{name:'Guru Vidushi Sahana Chethan',role:'Founder & Artistic Director',org:'Sahachetana Natyalaya (R.)',
 quote:'“Let no artistic dream be crushed for want of money.” — her resolve, from the Kannada profile',
 overview:'Bharatanatyam exponent, choreographer, cultural curator and teacher. MPA in Bharatanatyam; Vidwat; trained in Madhuri Margam under Dr. Tulasi Ramachandra; Doordarshan B-High Grade artiste. Participated in the Republic Day Parade, New Delhi, as an NSS candidate.',
 story:[
 'Born into a modest family in Shivamogga, Sahana grew up with eyes full of unfamiliar worlds, watching dance on television. In the fourth standard a friend’s remark about a dance programme at Kuvempu Rangamandira awoke a dream to dance on that stage.',
 'Her first steps were taken before Vidwan Keshavakumar, and her dance soon carried her to the national stage in Delhi. Yet life was not easy: financial hardship made even a fee of ₹25–₹50 a burden, and an early humiliation over unpaid fees became a wound that hardened into resolve.',
 'A switch from Kannada to English medium unsettled her studies, and dance was nearly given up. Returning to training under Guru Geeta Dathar, she found her stage again.',
 'When her guru passed away in 2003, Sahana lovingly took on the responsibility of the students left behind. A teacher was born.',
 'On 17 September 2005 (Ananta Chaturdashi) she opened Sahachetana, her “dance school of dreams” — first at Ravishankar Vidyamandira, later at Vasavi school. She has taught for over two decades, and for 21 years has trained children from underprivileged backgrounds.',
 'Her PATYADARSHINI project turns school-textbook poems and prose into dance for government-school children, presented at Kuvempu Rangamandira for 15 years. Each Ugadi she releases the poetry anthology “Kavi Kanda Yugadi”. She started the Natyaaradhana festival, now in its 15th edition.',
 'Her husband Chetan stands behind every stage as the unseen pillar — in the Kannada profile’s words, the true “Chetana” of Sahachetana.'],
 honours:['2026 — Mahila Ratna Award','2023 — Kannada Siri Award','2018 — Rotary Vocational Excellence Award','2013 — Chaya Chetana Award'],
 stages:['Mysore Dasara','Hampi Utsava','Kittur Utsava','Vishwa Kannada Sammelana','Sahyadri Utsava','Delhi Karnataka Sangha','Sripuram Golden Temple, Vellore','Doordarshan Chandana'],
 other:['Authorship: “Kavi Kanda Yugadi” poetry anthology; ~150 newspaper columns on dance (2018) [VERIFY title & publication]','Theatre choreography, e.g. Rangayana Karunege Jai [VERIFY]','Ajita Shri Puraskara & free Rangapravesha initiatives']},
{name:'Chetan S.',role:'Artistic Director — Sahachetana Natyalaya (R.)',org:'',quote:'',overview:'[Biography placeholder — to be supplied by the institution.]',story:['[Professional achievements placeholder]','[Responsibilities and contributions placeholder]'],honours:[],stages:[],other:[]}];
export const batches=Array.from({length:7},(_,i)=>({id:i+1,name:`Batch 0${i+1}`,location:`Teaching location ${i+1} [placeholder]`,address:'Address & landmark [placeholder]',days:'Days [placeholder]',timings:'Timings [placeholder]',level:'Student level [placeholder]',age:'Age group [placeholder]',teacher:'Teacher [placeholder]',desc:'Short description of this batch to be added.'}));
export const seedPrograms=[
{id:1,kind:'upcoming',title:'Upcoming Program 01 [placeholder]',date:'Date TBA',venue:'Venue TBA',cat:'Performance',desc:'Short description.'},
{id:2,kind:'upcoming',title:'Upcoming Program 02 [placeholder]',date:'Date TBA',venue:'Venue TBA',cat:'Workshop',desc:'Short description.'},
{id:3,kind:'past',title:'Past Program 01 [placeholder]',date:'Date TBA',venue:'Venue TBA',cat:'Festival',desc:'Short description.'},
{id:4,kind:'past',title:'Past Program 02 [placeholder]',date:'Date TBA',venue:'Venue TBA',cat:'Performance',desc:'Short description.'}];
export const awards=[[2026,'Mahila Ratna Award'],[2023,'Kannada Siri Award'],[2018,'Rotary Vocational Excellence Award'],[2013,'Chaya Chetana Award']].map(([y,n])=>({y,n,org:'Awarding organisation [VERIFY]'}));
export const initiatives=['Bharatheeyam','Patyadarshini','Ajita Shri Puraskara','Free Rangapravesha Initiatives','Other Cultural Programmes'];
export const categories=['New Admissions','Batch Timings','Performances','Cultural Collaboration','Events and Workshops','General Enquiry'];
export const CONFIG={whatsapp:'', email:''}; // set wa.me number / mailto address here
