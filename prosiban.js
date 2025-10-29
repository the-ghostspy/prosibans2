function generateForm() {
    const Equipe = parseInt(document.getElementById("team").value);
    const espaceForm = document.getElementById("espaceForm");
    espaceForm.innerHTML = "";

    if (isNaN(Equipe) || Equipe < 1 || Equipe > 10) {
        alert("Veuillez entrer un nombre de binômes entre 1 et 10.");
        return;
    }

    for (let i = 1; i <= Equipe; i++) {
        const block = document.createElement("div");
        block.className = "Team-block show";
        block.innerHTML = `
            <h3>BINÔME ${i}</h3>
            <label>Nom du participant 1 :</label>
            <input type="text" name="B1_${i}" required>
            <label>Nom du participant 2 :</label>
            <input type="text" name="B2_${i}" required>

            <h4>Règles du programme</h4>
            
            <!-- Pliades - Vérification par binôme -->
            <label><strong>Pliades respectées :</strong></label><br>
            <label><input type="checkbox" name="pliades_B1_${i}"> Participant 1 a respecté</label><br>
            <label><input type="checkbox" name="pliades_B2_${i}"> Participant 2 a respecté</label><br><br>

            <!-- Documentation - Vérification par binôme -->
            <label><strong>Documentation :</strong></label><br>
            <label><input type="checkbox" name="doc_B1_${i}"> Participant 1 a fait</label><br>
            <label><input type="checkbox" name="doc_B2_${i}"> Participant 2 a fait</label><br><br>

            <!-- Targets - Vérification détaillée -->
            <label><strong>Targets (Objectifs) :</strong></label><br>
            
            <!-- Participant 1 -->
            <label>Participant 1 a respecté le produit target :
                <select name="target_B1_${i}" onchange="toggleTargetDetails('target_B1_${i}', 'targetDetails_B1_${i}')">
                    <option value="no">NON</option>
                    <option value="yes">OUI</option>
                    <option value="other">Autre produit recommandé</option>
                </select>
            </label>
            <div id="targetDetails_B1_${i}" style="display:none;">
                <label>Nombre de PV Participant 1 : <input type="number" name="targetPV_B1_${i}" value="0" min="0"></label>
            </div><br>

            <!-- Participant 2 -->
            <label>Participant 2 a respecté le produit target :
                <select name="target_B2_${i}" onchange="toggleTargetDetails('target_B2_${i}', 'targetDetails_B2_${i}')">
                    <option value="no">NON</option>
                    <option value="yes">OUI</option>
                    <option value="other">Autre produit recommandé</option>
                </select>
            </label>
            <div id="targetDetails_B2_${i}" style="display:none;">
                <label>Nombre de PV Participant 2 : <input type="number" name="targetPV_B2_${i}" value="0" min="0"></label>
            </div><br>

            <!-- Inscriptions - Vérification détaillée avec PV -->
            <label><strong>Inscriptions :</strong></label><br>
            <label>Participant 1 a fait l'inscription (≥30 PV) :
                <select name="inscr_B1_${i}" onchange="togglePV('inscr_B1_${i}', 'inscrPV_B1_${i}')">
                    <option value="no">NON</option>
                    <option value="yes">OUI</option>
                </select>
            </label>
            <div id="inscrPV_B1_${i}" style="display:none;">
                <label>Nombre de PV Participant 1 : <input type="number" name="inscrPV_B1_${i}" value="0" min="0"></label>
            </div><br>

            <label>Participant 2 a fait l'inscription (≥30 PV) :
                <select name="inscr_B2_${i}" onchange="togglePV('inscr_B2_${i}', 'inscrPV_B2_${i}')">
                    <option value="no">NON</option>
                    <option value="yes">OUI</option>
                </select>
            </label>
            <div id="inscrPV_B2_${i}" style="display:none;">
                <label>Nombre de PV Participant 2 : <input type="number" name="inscrPV_B2_${i}" value="0" min="0"></label>
            </div><br>

            <!-- Formation - Présence et statistiques -->
            <label><strong>Formation :</strong></label><br>
            <label>Ce binôme forme-t-il ? 
                <select name="isForming_${i}" onchange="toggleFormationStats('isForming_${i}', 'formationStats_${i}')">
                    <option value="no">NON</option>
                    <option value="yes">OUI</option>
                </select>
            </label><br>
            
            <label><input type="checkbox" name="form_B1_${i}"> Participant 1 présent à toutes les formations</label><br>
            <label><input type="checkbox" name="form_B2_${i}"> Participant 2 présent à toutes les formations</label><br>
            
            <div id="formationStats_${i}" style="display:none;">
                <label>Nombre de personnes connectées au début : <input type="number" name="formStart_${i}" value="0" min="0"></label><br>
                <label>Nombre de personnes connectées au milieu : <input type="number" name="formMiddle_${i}" value="0" min="0"></label><br>
                <label>Nombre de personnes connectées à la fin : <input type="number" name="formEnd_${i}" value="0" min="0"></label>
            </div><br>

            <label><input type="checkbox" name="regular_${i}"> Régularité (2 jours remplis)</label><br>
        `;
        espaceForm.appendChild(block);
    }

    document.getElementById("submitBTn").style.display = "inline-block";
}

// Fonction pour afficher/masquer les détails target
function toggleTargetDetails(selectName, detailsDivId) {
    const select = document.querySelector(`[name="${selectName}"]`);
    const detailsDiv = document.getElementById(detailsDivId);
    if (select.value === "yes" || select.value === "other") {
        detailsDiv.style.display = "block";
    } else {
        detailsDiv.style.display = "none";
    }
}

// Fonction pour afficher/masquer les champs PV inscriptions
function togglePV(selectName, pvDivId) {
    const select = document.querySelector(`[name="${selectName}"]`);
    const pvDiv = document.getElementById(pvDivId);
    if (select.value === "yes") {
        pvDiv.style.display = "block";
    } else {
        pvDiv.style.display = "none";
    }
}

// Fonction pour afficher/masquer les statistiques de formation
function toggleFormationStats(selectName, statsDivId) {
    const select = document.querySelector(`[name="${selectName}"]`);
    const statsDiv = document.getElementById(statsDivId);
    if (select.value === "yes") {
        statsDiv.style.display = "block";
    } else {
        statsDiv.style.display = "none";
    }
}

function processResult(event) {
    event.preventDefault();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Résultats :</h2>";

    const teamCount = parseInt(document.getElementById("team").value);
    const form = document.getElementById("formEquip");
    let results = [];
    let detailedResults = []; // Pour stocker les détails

    for (let i = 1; i <= teamCount; i++) {
        const b1 = form.querySelector(`[name="B1_${i}"]`).value.trim();
        const b2 = form.querySelector(`[name="B2_${i}"]`).value.trim();
        const binomeName = `${b1} & ${b2}`;

        // Récupération des données
        const pliades_B1 = form.querySelector(`[name="pliades_B1_${i}"]`).checked;
        const pliades_B2 = form.querySelector(`[name="pliades_B2_${i}"]`).checked;
        
        const doc_B1 = form.querySelector(`[name="doc_B1_${i}"]`).checked;
        const doc_B2 = form.querySelector(`[name="doc_B2_${i}"]`).checked;
        
        // Targets
        const target_B1 = form.querySelector(`[name="target_B1_${i}"]`).value;
        const target_B2 = form.querySelector(`[name="target_B2_${i}"]`).value;
        const targetPV_B1 = parseInt(form.querySelector(`[name="targetPV_B1_${i}"]`)?.value || 0);
        const targetPV_B2 = parseInt(form.querySelector(`[name="targetPV_B2_${i}"]`)?.value || 0);
        
        const inscr_B1 = form.querySelector(`[name="inscr_B1_${i}"]`).value;
        const inscr_B2 = form.querySelector(`[name="inscr_B2_${i}"]`).value;
        const inscrPV_B1 = parseInt(form.querySelector(`[name="inscrPV_B1_${i}"]`)?.value || 0);
        const inscrPV_B2 = parseInt(form.querySelector(`[name="inscrPV_B2_${i}"]`)?.value || 0);
        
        const form_B1 = form.querySelector(`[name="form_B1_${i}"]`).checked;
        const form_B2 = form.querySelector(`[name="form_B2_${i}"]`).checked;
        
        const isForming = form.querySelector(`[name="isForming_${i}"]`).value;
        const formStart = parseInt(form.querySelector(`[name="formStart_${i}"]`)?.value || 0);
        const formMiddle = parseInt(form.querySelector(`[name="formMiddle_${i}"]`)?.value || 0);
        const formEnd = parseInt(form.querySelector(`[name="formEnd_${i}"]`)?.value || 0);
        
        const regular = form.querySelector(`[name="regular_${i}"]`).checked;
        
        let score = 0;
        let details = {
            binome: binomeName,
            pliades: 0,
            documentation: 0,
            targets: 0,
            inscriptions: 0,
            formation: 0,
            regularite: 0,
            total: 0
        };

        // 1. Pliades - Les deux respectent → +1 point
        if (pliades_B1 && pliades_B2) {
            score += 1;
            details.pliades = 1;
        }

        // 2. Documentation - Toute l'équipe fait → +4 points
        if (doc_B1 && doc_B2) {
            score += 4;
            details.documentation = 4;
        }

        // 3. TARGETS - NOUVELLE LOGIQUE : (PV respect + PV convertis) ÷ 2
        const targetRespect_B1 = target_B1 === "yes";
        const targetRespect_B2 = target_B2 === "yes";
        const targetOther_B1 = target_B1 === "other";
        const targetOther_B2 = target_B2 === "other";
        
        let totalPVRespect = 0;
        let totalPVConvertis = 0;

        // PV des targets respectés
        if (targetRespect_B1) totalPVRespect += targetPV_B1;
        if (targetRespect_B2) totalPVRespect += targetPV_B2;

        // PV des produits recommandés (autres)
        if (targetOther_B1) totalPVConvertis += targetPV_B1;
        if (targetOther_B2) totalPVConvertis += targetPV_B2;

        // Calcul final : (PV respect + PV convertis) ÷ 2
        if (targetRespect_B1 || targetRespect_B2 || targetOther_B1 || targetOther_B2) {
            const targetPoints = (totalPVRespect + totalPVConvertis) / 2;
            score += targetPoints;
            details.targets = targetPoints;
        } else {
            // Aucun ne respecte et aucun autre produit → pénalité
            score -= 5;
            details.targets = -5;
        }       // 4. Inscriptions - Avec vérification PV ≥ 30
const inscrRespect_B1 = (inscr_B1 === "yes") && (inscrPV_B1 >= 30);
const inscrRespect_B2 = (inscr_B2 === "yes") && (inscrPV_B2 >= 30);

if (inscrRespect_B1 && inscrRespect_B2) {
    let inscriptionPoints = 200;
    // Bonus si ≥60 PV = 200 + PV de l'inscription ≥60
    if (inscrPV_B1 >= 60) {
        inscriptionPoints += inscrPV_B1;
    }
    if (inscrPV_B2 >= 60) {
        inscriptionPoints += inscrPV_B2;
    }
    score += inscriptionPoints;
    details.inscriptions = inscriptionPoints;
} else if (inscrRespect_B1 || inscrRespect_B2) {
    score += 25;
    details.inscriptions = 25;
} else {
    score -= 70;
    details.inscriptions = -70;  }

        // 5. Formation
        if (form_B1 && form_B2) {
            // Les deux présents - pas de pénalité
            // Points supplémentaires si c'est eux qui forment
            if (isForming === "yes") {
                const moyenneConnectes = (formStart + formMiddle + formEnd) / 3;
                if (moyenneConnectes >= 25) {
                    // À ADAPTER avec le barème officiel
                    const formationPoints = Math.min(10, Math.floor(moyenneConnectes / 5));
                    score += formationPoints;
                    details.formation = formationPoints;
                }
            }
        } else if (form_B1 || form_B2) {
            score -= 2;
            details.formation = -2;
        } else {
            score -= 6;
            details.formation = -6;
        }

        // 6. Régularité
        if (!regular) {
            score -= 50;
            details.regularite = -50;
        }

        details.total = Math.round(score);
        results.push({ binome: binomeName, points: Math.round(score) });
        detailedResults.push(details);
    }

    results.sort((a, b) => b.points - a.points);
    detailedResults.sort((a, b) => b.total - a.total);

    // Tableau des résultats
    let html = `
    <table class="result-table">
        <tr>
            <th>Classement</th>
            <th>Binôme</th>
            <th>Score</th>
            <th>Progression</th>
        </tr>`;

    const maxScore = Math.max(...results.map(r => r.points));

    results.forEach((r, i) => {
        const percentage = maxScore > 0 ? Math.max(0, (r.points / maxScore) * 100) : 0;
        html += `
        <tr ${i === 0 ? 'style="background:#e0ffe0;font-weight:bold;"' : ''}>
            <td>${i + 1}${i === 0 ? " 🏆" : ""}</td>
            <td>${r.binome}</td>
            <td>${r.points}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress" style="width:${percentage}%;"></div>
                </div>
            </td>
        </tr>`;
    });

    html += "</table>";
    
    // Bouton de téléchargement
    html += `
    <div style="margin-top: 20px; text-align: center;">
        <button onclick="downloadDetailedResults()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
            📊 Télécharger le décompte détaillé
        </button>
    </div>`;
    
    resultDiv.innerHTML += html;

    // Stocker les résultats détaillés pour le téléchargement
    window.detailedResults = detailedResults;
}

// Fonction pour télécharger le fichier détaillé
function downloadDetailedResults() {
    if (!window.detailedResults || window.detailedResults.length === 0) {
        alert("Aucun résultat à télécharger");
        return;
    }

    let csvContent = "Classement;Binôme;Pliades;Documentation;Targets;Inscriptions;Formation;Régularité;Total\n";
    
    window.detailedResults.forEach((result, index) => {
        const row = [
            index + 1,
            result.binome,
            result.pliades,
            result.documentation,
            Math.round(result.targets * 100) / 100, // Arrondir à 2 décimales
            result.inscriptions,
            result.formation,
            result.regularite,
            result.total
        ].join(";");
        
        csvContent += row + "\n";
    });

    // Créer et télécharger le fichier
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "decompte_points_competition.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
