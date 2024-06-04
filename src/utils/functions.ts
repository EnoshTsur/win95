import { OpenWindow } from "store/types";
import { arrayBuffer } from "stream/consumers";

export const splitIntoChunks = <T>(array: ReadonlyArray<T>) => (numberOfChunks: number) =>  {
        if (numberOfChunks <= 0) {
            throw new Error("numberOfChunks must be greater than 0");
        }

        const chunkSize = Math.ceil(array.length / numberOfChunks);

        return array.reduce((acc, _, index) => {
            if (index % chunkSize === 0) {
                return [...acc, array.slice(index, index + chunkSize)];
            }
            return acc;
        }, [] as ReadonlyArray<ReadonlyArray<T>>);
}



export const splitIntoLimitedLengthChunks = <T>(array: ReadonlyArray<T>) => (arrayLimitLength: number) => {
        if (arrayLimitLength <= 0) {
            throw new Error("arrayLimitLength must be greater than 0");
        }

        return array.reduce((acc, _, index) => {
            if (index % arrayLimitLength === 0) {
                return [...acc, array.slice(index, index + arrayLimitLength)];
            }
            return acc;
        }, [] as ReadonlyArray<ReadonlyArray<T>>);
}

export const popOpenWindow = (arr: ReadonlyArray<OpenWindow>) => (id: string) => {
      const matchingIndex = arr.reduce((elIndex, { id: windowId }, index) => windowId === id ? index : elIndex , -1)

      if (matchingIndex === -1) {
        return arr
      }
  
      return arr
        .filter((_, index) => index !== matchingIndex)
        .map(({ id: windowId, zIndex }, index) => ({ 
            id: windowId, 
            zIndex: index < matchingIndex ? zIndex + 1 : zIndex
        }))
}

export const moveOpenWindowToTop = (arr: ReadonlyArray<OpenWindow>) => (id: string) =>  [
        { id, zIndex: 0 }, 
    ...popOpenWindow(arr)(id)
]


export function playErrorSound() {
    const audioContext = new window.AudioContext;
  
    // Create an OscillatorNode
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle'; // You can try different waveforms like 'square', 'sine', 'sawtooth', etc.
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime); // Set frequency (adjust to your preference)
  
    // Create a GainNode to control the volume
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Set volume (0 to 1)
  
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    // Start the oscillator
    oscillator.start();
  
    // Stop the oscillator after a short duration
    setTimeout(() => {
      oscillator.stop();
    }, 100); // Adjust duration as needed
  }
