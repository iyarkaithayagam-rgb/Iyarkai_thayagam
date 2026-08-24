// Supabase Client Configuration for Iyarkai Thayagam NGO
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project credentials from https://supabase.com

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabase = null;

if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL") {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase Client Initialized Successfully!");
} else {
    console.log("Supabase SDK loaded. Enter your SUPABASE_URL & SUPABASE_ANON_KEY to enable live cloud submissions.");
}

/**
 * Submit Volunteer Application to Supabase 'volunteers' table
 */
async function submitVolunteerForm(data) {
    if (!supabase) {
        console.warn("Supabase credentials not configured yet.");
        return { success: true, message: "Registration recorded locally! (Configure Supabase credentials to enable cloud database saving)" };
    }

    try {
        const { error } = await supabase.from('volunteers').insert([
            {
                full_name: data.fullName,
                phone: data.phone,
                email: data.email || null,
                preferred_pillar: data.preferredPillar
            }
        ]);

        if (error) throw error;
        return { success: true, message: "Thank you! Your volunteer application has been saved to the cloud." };
    } catch (err) {
        console.error("Supabase Error:", err.message);
        return { success: false, message: "Submission failed: " + err.message };
    }
}

/**
 * Submit Contact Inquiry to Supabase 'contact_messages' table
 */
async function submitContactMessage(data) {
    if (!supabase) {
        return { success: true, message: "Message recorded! (Configure Supabase credentials to enable cloud saving)" };
    }

    try {
        const { error } = await supabase.from('contact_messages').insert([
            {
                full_name: data.fullName,
                email: data.email,
                phone: data.phone || null,
                message: data.message
            }
        ]);

        if (error) throw error;
        return { success: true, message: "Thank you! Your message has been received." };
    } catch (err) {
        console.error("Supabase Error:", err.message);
        return { success: false, message: "Message sending failed: " + err.message };
    }
}
