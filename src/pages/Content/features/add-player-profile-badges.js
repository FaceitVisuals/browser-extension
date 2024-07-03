import React, { useEffect } from 'react';
import axios from 'axios';


function ProfileBadges() {
  useEffect(() => {
    async function assignBadgesToProfiles() {
      const queries = [];

      const observer = new MutationObserver(async (mutations) => {
        for (const mutation of mutations) {
          if (!(mutation.target instanceof HTMLElement)) continue;
          const parasiteContainer = mutation.target.querySelector('#parasite-player-profile > div');
          
          if (parasiteContainer) {
            // Logic to retrieve user IDs and badges
            const userIds = await getAPIUserIds();
            const badgesResponse = await axios.post('', {
              users: userIds.map((item) => item.id)
            });

            queries.forEach((query) => {
              const nickname = query.dataset.nickname;
              const userId = userIds.find((user) => user.nickname === nickname)?.id;

              if (userId) {
                const container = query.querySelector('img')?.parentElement?.parentElement?.parentElement;
                if (container) {
                  assignBadge(container, badgesResponse, userId);
                }
              }
            });

            break;
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }

    assignBadgesToProfiles();
  }, []);

  function assignBadge(container, badgesResponse, userId) {
    const profile = container.children[0];

    const userBadges = badgesResponse.data.exists;
    const userHasBadges = userBadges.some((badge) => badge.username === userId);
    if (userHasBadges) {
      container.innerHTML = '';
      const badgesContainer = document.createElement('div');
      // Code to create badges based on badgeResponse and userId
      // ...
      container.appendChild(profile);
      container.appendChild(badgesContainer);
    }
  }

  

  return <></>;
}

export default ProfileBadges;
