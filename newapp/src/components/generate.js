const adjectives = ['Adorable', 'Adventurous', 'Alert', 'Alive', 'Amused', 'Angry', 'Annoyed', 'Annoying', 'Anxious', 'Attractive', 'Average', 'Bad', 'Beautiful', 'Better', 'Bewildered', 'Blushing', 'Bored', 'Brainy', 'Brave', 'Bright', 'Busy', 'Calm', 'Careful', 'Cautious', 'Charming', 'Cheerful', 'Clear', 'Clever', 'Clumsy', 'Comfortable', 'Concerned', 'Confused', 'Cooperative', 'Courageous', 'Crazy', 'Creepy', 'Curious', 'cute', 'dangerous', 'defiant', 'delightful', 'determined', 'different', 'disturbed', 'dizzy', 'dull', 'eager', 'elegant', 'embarrassed', 'enchanting', 'energetic', 'enthusiastic', 'evil', 'excited', 'expensive', 'fair', 'famous', 'fancy', 'fantastic', 'fierce', 'foolish', 'frantic', 'friendly', 'frightened', 'funny', 'gentle', 'gifted', 'glamorous', 'gleaming', 'glorious', 'good', 'gorgeous', 'graceful', 'grumpy', 'handsome', 'happy', 'healthy', 'helpful', 'hilarious', 'hungry', 'hurt', 'impossible', 'innocent', 'inquisitive', 'jealous', 'jittery', 'jolly', 'joyous', 'kind']

const animals = ['alligator', 'anteater', 'armadillo', 'auroch', 'axolotl', 'badger', 'bat', 'bear', 'beaver', 'blobfish', 'buffalo', 'camel', 'chameleon', 'cheetah', 'chipmunk', 'chinchilla', 'chupacabra', 'cormorant', 'coyote', 'crow', 'dingo', 'dinosaur', 'dog', 'dolphin', 'dragon', 'duck', 'octopus', 'elephant', 'ferret', 'fox', 'frog', 'giraffe', 'goose', 'gopher', 'grizzly', 'hamster', 'hedgehog', 'hippo', 'hyena', 'jackal', 'jackalope', 'ibex', 'ifrit', 'iguana', 'kangaroo', 'kiwi', 'koala', 'kraken', 'lemur', 'leopard', 'liger', 'lion', 'llama', 'manatee', 'mink', 'monkey', 'moose', 'narwhal', 'nyanCat', 'orangutan', 'otter', 'panda', 'penguin', 'platypus', 'python', 'pumpkin', 'quagga', 'quokka', 'rabbit', 'raccoon', 'rhino', 'sheep', 'shrew', 'skunk', 'squirrel', 'tiger', 'turtle', 'unicorn', 'walrus', 'wolf', 'wolverine', 'wombat']

function generateAdjective() {
    let adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    adj = adj.split('')
    adj[0] = adj[0].toLocaleUpperCase()
    adj = adj.join('')
    return adj
}

function generateAnimal() {
    let ani = animals[Math.floor(Math.random() * animals.length)]
    ani = ani.split('')
    ani[0] = ani[0].toLocaleUpperCase()
    ani = ani.join('')
    return ani
}

function generateNumber() {
    let num = Math.floor(Math.random() * 1000)
    num += ''
    if (num.length === 2){
        num = '0' + num
    }
    return num
}

function generateUsername() {
    return generateAdjective() + generateAnimal() + generateNumber()
}

module.exports = {
    adjectives,
    animals,
    generateAdjective,
    generateAnimal,
    generateNumber,
    generateUsername
}