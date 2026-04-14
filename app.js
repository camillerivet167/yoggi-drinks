// =============================================
// CONFIG — remplace ces valeurs par les tiennes
// depuis ton tableau de bord Supabase
// =============================================
const SUPABASE_URL = 'https://VOTRE_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'VOTRE_ANON_KEY';

// =============================================
// SOUMISSION DU FORMULAIRE
// =============================================
async function submitForm() {
  const prenom = document.getElementById('fp').value.trim();
  const nom = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const whatsapp = document.getElementById('ft').value.trim();
  const session = document.getElementById('fs').value;
  const niveau = document.getElementById('fnv').value;

  const errorDiv = document.getElementById('form-error');
  const submitBtn = document.getElementById('submit-btn');

  errorDiv.style.display = 'none';

  if (!prenom || !email || !session) {
    errorDiv.textContent = 'Remplis au moins ton prénom, email et la date !';
    errorDiv.style.display = 'block';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours...';

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        prenom,
        nom,
        email,
        whatsapp,
        session_date: session,
        niveau,
        created_at: new Date().toISOString()
      })
    });

    if (response.ok || response.status === 201) {
      document.getElementById('y-fv').style.display = 'none';
      document.getElementById('y-ok').style.display = 'block';
    } else {
      throw new Error('Erreur serveur: ' + response.status);
    }
  } catch (err) {
    console.error(err);
    errorDiv.textContent = 'Oups, une erreur s\'est produite. Réessaie dans un instant.';
    errorDiv.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'C\'est bon, je m\'inscris !';
  }
}
