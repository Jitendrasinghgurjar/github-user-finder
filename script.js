const form = document.querySelector("form");
const input = form.querySelector("input");
const card = document.querySelector(".profile-card");

function renderUser(data) {
  card.innerHTML = `
    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 md:mb-0">
      <img src="${data.avatar_url}" alt="${data.login}" class="w-full h-full object-cover"/>
    </div>

    <div class="flex-1 space-y-2 text-left md:ml-6">
      <h2 class="text-xl font-bold text-white">${data.name || data.login}</h2>
      <p class="text-sm text-gray-400">${data.bio || "No bio available."}</p>

      <div class="mt-4 flex gap-6 font-semibold text-sm text-white">
        <div>
          <p class="text-gray-400">Followers</p>
          <p class="text-lg">${data.followers}</p>
        </div>
        <div>
          <p class="text-gray-400">Following</p>
          <p class="text-lg">${data.following}</p>
        </div>
        <div>
          <p class="text-gray-400">Repos</p>
          <p class="text-lg">${data.public_repos}</p>
        </div>
      </div>
    </div>
  `;
  
  card.classList.add("flex", "flex-col", "md:flex-row", "items-center", "md:items-start", "gap-6");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = input.value.trim();
  if (!username) return;

  card.innerHTML = `<p class="text-gray-400 text-sm">Fetching user data...</p>`;
  card.classList.remove("flex"); 

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();
    renderUser(data);
  } catch (err) {
    card.innerHTML = `<p class="text-red-500 text-sm font-semibold">❌ User not found. Try again.</p>`;
  }
});
