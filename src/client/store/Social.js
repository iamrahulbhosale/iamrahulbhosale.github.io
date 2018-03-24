const INITIAL_STATE = {
  links: {
    dribbble: {
      url: 'https://dribbble.com/rahulbhosale',
      label: 'Dribbble'
    },
    behance: {
      url: 'https://www.behance.net/rahulbhosale',
      label: 'Behance'
    },
    instagram: {
      url: 'https://www.instagram.com/rahul.design',
      label: 'Instagram'
    },
    medium: {
      url: 'https://medium.com/@rahul.design',
      label: 'Medium'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/iamrahulbhosale',
      label: 'LinkedIn'
    }
  }
}

export default function SocialReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
