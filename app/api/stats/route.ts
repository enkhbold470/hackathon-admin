import { NextResponse } from 'next/server';

const csvData = `"id","user_id","cwid","full_name","discord","skill_level","hackathon_experience","hear_about_us","why_attend","project_experience","future_plans","fun_fact","self_description","links","teammates","referral_email","dietary_restrictions_extra","tshirt_size","agree_to_terms","status","created_at","updated_at"
"36","user_2wTtK8sRB7li4JONNhYk0IcNm1y","20558263","Yu Hong Chen","elijah932911","expert","10+","friend","Keep grinding and build something new.","Our EEG project was built together with Inky.","I want to build something related to healthcare and biochem, but where is the biochem track?","Nothing much, plays the electric guitar, and cello.","balanced","https://www.linkedin.com/in/yu-hong-elijah-chen-47553931a/","","","N/A","M","true","confirmed","2025-05-06 09:11:04.673","2025-05-13 20:43:01.814"
"37","user_2wjg8TvUXvGesaELdE8cT44wYg6","20676675","Sayon Biswas","sayonqlo","advanced","1-5","friend","To learn and make a project","Foothill Innovation challenge: we are making a hardware product. The product will detect when you make a mistake on the driving exam while driving.","I am open to building anything depending on the hackathon theme","I can speak Bengali and Chinese","balanced","https://www.linkedin.com/in/sayonbiswas/
https://github.com/sayonqlo","","","N/A","M","true","accepted","2025-05-06 19:54:11.124","2025-05-19 14:40:58.076"
"38","user_2wQmgqSJevBcDTOqMCmKKpUWYvx","20549229","Enkhbold Ganbold","inky3457","beginner","0","friend","* 🤔 Why do you wanna come to DAHacks?","* 🤔 Why do you wanna come to DAHacks?","* 🤔 Why do you wanna come to DAHacks?","* 🤔 Why do you wanna come to DAHacks?","balanced","","","","N/A","XL","true","waitlisted","2025-05-07 08:43:39.523","2025-05-21 22:40:42.391"
"42","user_2wpizwcUOtjJFqS6Acm0qSo5elZ","20537508","Abdullah Mohammad","amxtrnl","advanced","1-5","discord","DAHacks is an experience. I've had the chance to attend both DAHacks2.5 and DAHacks3.0 and I loved every second of it. The Hackathon experience is awesome, and I love working in fast-paced, high-stakes situations. De Anza has such a rich and supportive community, and I feel that reflects in these hackathons as well. I want to make something cool with my friends, and DAHacks seems like just the place for that!","I've worked on many projects in the past, but one of my favorites was training a Neural Network to translate sign language. It was so cool being able to make something super useful, and I learned a lot while making it!","I don't know yet, but I probably want to make something AI-related and impactful! I have a passion for accessible technology, and I think AI can help bridge any gaps we have in our society!","I love to bike!","technical","https://github.com/Abdullah25Mohammad/","","","Vegan","L","true","accepted","2025-05-08 23:07:26.56","2025-05-19 14:41:21.297"
"43","user_2wpnzy2BbLWPydF9b8nfmCNXerJ","20654839","Oak Soe Khant","ichigoryukia09","beginner","0","friend","Interested about the hackathons.","Educational app to help the youth and the community","Educational app to help the youth and the community","Nothing.","balanced","mrshine09","-","-","N/A","L","true","accepted","2025-05-08 23:44:09.665","2025-05-19 14:41:49.635"
"44","user_2wpnzuYqBS7dJLSbDuiIsEmdcz1","20568574","Tyler Darisme","a_fig","intermediate","1-5","friend","To build with friends and have fun.","Building bots to complete tasks in side of MMO's","Some kind of educational app to help the youth.","I know how to program apps for the blockchain.","technical","https://github.com/a-fig","oaksoekhant182209@gmail.com
sendsayon@gmail.com
not sure tho","","N/A","L","true","accepted","2025-05-08 23:45:50.183","2025-05-16 00:40:50.975"`;

interface Applicant {
  id: string;
  user_id: string;
  cwid: string;
  full_name: string;
  discord: string;
  skill_level: string;
  hackathon_experience: string;
  hear_about_us: string;
  why_attend: string;
  project_experience: string;
  future_plans: string;
  fun_fact: string;
  self_description: string;
  links: string;
  teammates: string;
  referral_email: string;
  dietary_restrictions_extra: string;
  tshirt_size: string;
  agree_to_terms: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function parseCSV(csvData: string): Applicant[] {
  const lines = csvData.trim().split('\\n');
  const headers = lines[0].split(',').map(header => header.replace(/"/g, ''));

  const data = lines.slice(1).map(line => {
    const values = [];
    let currentVal = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (line[i+1] === '"') {
          currentVal += '"';
          i++; 
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(currentVal);
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal); 

    const entry: { [key: string]: any } = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] ? values[index].replace(/"/g, '') : '';
    });
    return entry as Applicant;
  });
  return data;
}

function getSkillLevelDistribution(data: Applicant[]): { [key: string]: number } {
  const distribution: { [key: string]: number } = {};
  for (const applicant of data) {
    const level = applicant.skill_level;
    distribution[level] = (distribution[level] || 0) + 1;
  }
  return distribution;
}

function getHackathonExperienceRange(data: Applicant[]): { [key: string]: number } {
  const distribution: { [key: string]: number } = {};
  for (const applicant of data) {
    const experience = applicant.hackathon_experience;
    distribution[experience] = (distribution[experience] || 0) + 1;
  }
  return distribution;
}

function getTShirtSizeDistribution(data: Applicant[]): { [key: string]: number } {
  const distribution: { [key: string]: number } = {};
  for (const applicant of data) {
    const size = applicant.tshirt_size;
    distribution[size] = (distribution[size] || 0) + 1;
  }
  return distribution;
}

const stopWords = ["a", "an", "the", "is", "to", "and", "i", "me", "my", "myself", "it", "its", "in", "for", "of", "on", "with", "am", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "should", "can", "could", "not", "but", "if", "or", "as", "at", "by", "from", "up", "down", "out", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "only", "own", "same", "so", "than", "too", "very", "s", "t", "just", "don", "now", "want", "to", "build", "something", "related", "help", "make"];

function getWordFrequency(texts: string[]): { [key: string]: number } {
  const frequency: { [key: string]: number } = {};
  for (const text of texts) {
    if (!text) continue;
    const words = text.toLowerCase().split(/[\s.,!?;:*()"]+/); 
    for (let word of words) {
      word = word.trim();
      if (word && !stopWords.includes(word)) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    }
  }
  return frequency;
}

function getSelfDescriptionWordFrequency(data: Applicant[]): { [key: string]: number } {
  const descriptions = data.map(applicant => applicant.self_description);
  return getWordFrequency(descriptions);
}

function getFunFactsWordFrequency(data: Applicant[]): { [key: string]: number } {
  const funFacts = data.map(applicant => applicant.fun_fact);
  return getWordFrequency(funFacts);
}

const projectThemesKeywords = {
  "healthcare": ["healthcare", "health", "medical", "biochem"],
  "education": ["education", "educational", "learn", "teaching"],
  "ai": ["ai", "artificial intelligence", "machine learning", "neural network"],
  "game": ["game", "gaming"],
  "web": ["web", "website", "online"],
  "mobile": ["mobile", "app", "ios", "android"],
  "data": ["data", "analysis", "big data"],
  "hardware": ["hardware", "iot", "device"],
  "community": ["community", "social", "society"],
  "blockchain": ["blockchain"],
};

function getProjectInterestThemes(data: Applicant[]): { [key: string]: number } {
  const themesCount: { [key: string]: number } = { "Open/unspecified": 0 };
  for (const applicant of data) {
    const plans = applicant.future_plans ? applicant.future_plans.toLowerCase() : "";
    let foundTheme = false;
    if (plans) {
      for (const theme in projectThemesKeywords) {
        for (const keyword of projectThemesKeywords[theme as keyof typeof projectThemesKeywords]) {
          if (plans.includes(keyword)) {
            themesCount[theme] = (themesCount[theme] || 0) + 1;
            foundTheme = true;
          }
        }
      }
    }
    if (!foundTheme) {
      themesCount["Open/unspecified"]++;
    }
  }
  return themesCount;
}

function getReferralSourceDistribution(data: Applicant[]): { [key: string]: number } {
  const distribution: { [key: string]: number } = {};
  for (const applicant of data) {
    const source = applicant.hear_about_us;
    if (source) { 
      distribution[source] = (distribution[source] || 0) + 1;
    }
  }
  return distribution;
}

function getApplicationSubmissionCountsByDate(data: Applicant[]): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  for (const applicant of data) {
    const createdAt = applicant.created_at;
    if (createdAt) {
      const datePart = createdAt.split(" ")[0]; 
      counts[datePart] = (counts[datePart] || 0) + 1;
    }
  }
  return counts;
}

function getApplicationStatusDistribution(data: Applicant[]): { [key: string]: number } {
  const distribution: { [key: string]: number } = {};
  for (const applicant of data) {
    const status = applicant.status;
    if (status) { 
      distribution[status] = (distribution[status] || 0) + 1;
    }
  }
  return distribution;
}

function getTeammateStats(data: Applicant[]): { [key: string]: any } {
  let applicantsWithTeammates = 0;
  for (const applicant of data) {
    if (applicant.teammates && applicant.teammates.trim() !== "" && applicant.teammates.trim() !== "-") {
      applicantsWithTeammates++;
    }
  }
  return {
    "applicantsWithTeammates": applicantsWithTeammates,
    "totalTeammatesListed": "N/A (simple count)" // Keeping it simple as requested
  };
}

function getDietaryRestrictionCounts(data: Applicant[]): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  for (const applicant of data) {
    const restriction = applicant.dietary_restrictions_extra ? applicant.dietary_restrictions_extra.trim() : "N/A";
    counts[restriction] = (counts[restriction] || 0) + 1;
  }
  return counts;
}

function getLinksProvidedCounts(data: Applicant[]): { [key: string]: number } {
  const counts: { [key: string]: number } = { "GitHub": 0, "LinkedIn": 0, "Other/Unknown": 0, "None": 0 };
  for (const applicant of data) {
    const linksField = applicant.links ? applicant.links.trim() : "";
    if (!linksField) {
      counts["None"]++;
      continue;
    }

    let foundSpecificLink = false;
    // Split by common delimiters like space, newline, comma
    const individualLinks = linksField.split(/[\s,\n]+/); 

    for (const link of individualLinks) {
      if (link.includes("github.com")) {
        counts["GitHub"]++;
        foundSpecificLink = true;
      } else if (link.includes("linkedin.com")) {
        counts["LinkedIn"]++;
        foundSpecificLink = true;
      }
    }
    // If specific links were found, and there might be other text, or if no specific link was found but field is not empty
    if (!foundSpecificLink && linksField) {
         // Check if the remaining part is not just parts of already counted links
        let isOnlySpecific = true;
        if (linksField.includes("github.com") || linksField.includes("linkedin.com")) {
            // This logic could be more robust: it currently assumes if either keyword is present, it's not "Other"
            // A more complex check would see if there's text *besides* these URLs.
            // For now, if it contains known domains, we assume it's covered.
            // If it has text AND it's not a known domain, then it's "Other"
            let tempLink = linksField;
            tempLink = tempLink.replace(/https?:\/\/[^\s,]+/g, ''); // Remove full URLs
            if (tempLink.trim().length > 0 && !tempLink.includes("github.com") && !tempLink.includes("linkedin.com")) {
                 isOnlySpecific = false;
            } else {
                isOnlySpecific = true; // It was only specific links
            }

        } else {
             isOnlySpecific = false; // No specific links, so it's other
        }

        if (!isOnlySpecific) {
            counts["Other/Unknown"]++;
        }
    }


  }
   // Adjusting based on the provided sample data logic for "Other/Unknown"
   // Sayon has two links, one GH, one LI. No Other.
   // Oak Soe has "mrshine09", which is Other.
   // The current logic for getLinksProvidedCounts might double count or miscategorise.
   // Let's simplify: if a link field is not empty, and does not contain github or linkedin, it's "Other".
   // If it contains github or linkedin, those are counted. If it contains *only* those, no "Other".
   // If it contains those AND other text, then also "Other". This is complex.
   // Re-evaluating based on example:
   // Yu Hong: LI=1
   // Sayon: LI=1, GH=1
   // Enkhbold: None=1
   // Abdullah: GH=1
   // Oak Soe: Other=1 (mrshine09)
   // Tyler: GH=1
   // Totals: GH=3, LI=2, Other=1, None=1. My code should aim for this.

  // Resetting and re-calculating with a clearer approach for "Other/Unknown"
  counts.GitHub = 0;
  counts.LinkedIn = 0;
  counts.OtherUnknown = 0; // Renamed for clarity in code
  counts.None = 0;

  for (const applicant of data) {
    const linksField = applicant.links ? applicant.links.trim() : "";
    if (!linksField || linksField === "-") {
      counts["None"]++;
      continue;
    }

    let hasGitHub = false;
    let hasLinkedIn = false;
    let hasOther = false;

    const individualLinks = linksField.split(/[\s,\n]+/);
    let potentialOtherText = "";

    for (const link of individualLinks) {
      if (link.includes("github.com")) {
        hasGitHub = true;
      } else if (link.includes("linkedin.com")) {
        hasLinkedIn = true;
      } else if (link.trim() !== "") {
        // Collect non-empty, non-URL-like strings for "Other" consideration
        potentialOtherText += link.trim() + " ";
      }
    }

    if (hasGitHub) counts["GitHub"]++;
    if (hasLinkedIn) counts["LinkedIn"]++;
    
    // If it's not a recognized GitHub or LinkedIn URL, and there's text, it's "Other"
    // This needs to be careful not to count parts of GH/LI links as "Other"
    // For example, "sayonqlo" from "github.com/sayonqlo" is not "Other"
    // The current sample CSV has "mrshine09" as the only "Other"
    // Let's refine: if the *entire* linksField, after removing GH and LI links, still has content, it's Other
    
    let remainingText = linksField;
    if (hasGitHub) remainingText = remainingText.replace(/https?:\/\/[^\s]*github\.com[^\s]*/g, '').trim();
    if (hasLinkedIn) remainingText = remainingText.replace(/https?:\/\/[^\s]*linkedin\.com[^\s]*/g, '').trim();
    
    if (remainingText.length > 0 && remainingText !== "" && remainingText !== "-") {
        // Check if the remaining text is not just a username already part of a GH/LI link if those were present
        // This is tricky. For "mrshine09", it is Other.
        // For "https://github.com/sayonqlo", remainingText would be empty.
        // For "https://www.linkedin.com/in/sayonbiswas/\nhttps://github.com/sayonqlo", remainingText would be empty.
        // If only "mrshine09" is present, remainingText is "mrshine09".
        counts["Other/Unknown"] = (counts["Other/Unknown"] || 0) + 1;
    }
  }
  // Correcting based on the final example logic:
  // Yu Hong: LI=1
  // Sayon: LI=1, GH=1
  // Enkhbold: None=1
  // Abdullah: GH=1
  // Oak Soe: Other=1 (mrshine09)
  // Tyler: GH=1
  // Expected: {"GitHub": 3, "LinkedIn": 2, "Other/Unknown": 1, "None": 1}

  // Final simplified logic pass for getLinksProvidedCounts
  const finalCounts: { [key: string]: number } = { "GitHub": 0, "LinkedIn": 0, "Other/Unknown": 0, "None": 0 };
  for (const applicant of data) {
      const links = applicant.links ? applicant.links.toLowerCase().trim() : "";
      if (!links || links === "-") {
          finalCounts["None"]++;
          continue;
      }
      
      let foundLinkType = false;
      if (links.includes("github.com")) {
          finalCounts["GitHub"]++;
          foundLinkType = true;
      }
      // An applicant can have multiple types of links.
      // So, we don't 'else if' here.
      if (links.includes("linkedin.com")) {
          finalCounts["LinkedIn"]++;
          foundLinkType = true;
      }
      
      // If it's not a GitHub or LinkedIn link, and the field is not empty, it's "Other/Unknown"
      // This logic means "mrshine09" would be Other.
      // "https://github.com/user\nmyportfolio.com" -> GitHub:1, Other:1
      // The problem states: "An applicant can provide multiple links." and "Count occurrences for each identified type."
      // This implies one applicant can contribute to GitHub count AND LinkedIn count.
      // For "Other/Unknown", it means any link string that is NOT github or linkedin.

      // Let's test per applicant from description:
      // Yu Hong: "linkedin.com..." -> LinkedIn: 1. Correct.
      // Sayon: "linkedin.com...\ngithub.com..." -> LinkedIn:1, GitHub:1. Correct.
      // Enkhbold: "" -> None:1. Correct.
      // Abdullah: "github.com..." -> GitHub:1. Correct.
      // Oak Soe: "mrshine09" -> No "github", no "linkedin". So, Other:1. Correct.
      // Tyler: "github.com..." -> GitHub:1. Correct.
      // This logic seems to match the example output.

      if (!links.includes("github.com") && !links.includes("linkedin.com") && links !== "") {
          finalCounts["Other/Unknown"]++;
          foundLinkType = true; // It's an "other" type
      }
  }
  return finalCounts;
}


export async function GET() {
  const parsedData = parseCSV(csvData);
  console.log("Parsed CSV Data:", parsedData.length, "applicants");

  const skillLevelDistribution = getSkillLevelDistribution(parsedData);
  console.log("Skill Level Distribution:", skillLevelDistribution);

  const hackathonExperienceRange = getHackathonExperienceRange(parsedData);
  console.log("Hackathon Experience Range:", hackathonExperienceRange);

  const tShirtSizeDistribution = getTShirtSizeDistribution(parsedData);
  console.log("T-Shirt Size Distribution:", tShirtSizeDistribution);

  const selfDescriptionWordFrequency = getSelfDescriptionWordFrequency(parsedData);
  console.log("Self Description Word Frequency:", selfDescriptionWordFrequency);

  const funFactsWordFrequency = getFunFactsWordFrequency(parsedData);
  console.log("Fun Facts Word Frequency:", funFactsWordFrequency);

  const projectInterestThemes = getProjectInterestThemes(parsedData);
  console.log("Project Interest Themes:", projectInterestThemes);

  const referralSourceDistribution = getReferralSourceDistribution(parsedData);
  console.log("Referral Source Distribution:", referralSourceDistribution);

  const applicationSubmissionCountsByDate = getApplicationSubmissionCountsByDate(parsedData);
  console.log("Application Submission Counts by Date:", applicationSubmissionCountsByDate);
  
  const applicationStatusDistribution = getApplicationStatusDistribution(parsedData);
  console.log("Application Status Distribution:", applicationStatusDistribution);

  const teammateStats = getTeammateStats(parsedData);
  console.log("Teammate Stats:", teammateStats);

  const dietaryRestrictionCounts = getDietaryRestrictionCounts(parsedData);
  console.log("Dietary Restriction Counts:", dietaryRestrictionCounts);

  const linksProvidedCounts = getLinksProvidedCounts(parsedData);
  console.log("Links Provided Counts:", linksProvidedCounts);

  return NextResponse.json({
    message: "All stats processing complete. Check console for details.",
    totalApplicants: parsedData.length,
    skillLevelDistribution,
    hackathonExperienceRange,
    tShirtSizeDistribution,
    selfDescriptionWordFrequency,
    funFactsWordFrequency,
    projectInterestThemes,
    referralSourceDistribution,
    applicationSubmissionCountsByDate,
    applicationStatusDistribution,
    teammateStats,
    dietaryRestrictionCounts,
    linksProvidedCounts,
  });
}
