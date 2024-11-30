declare module 'react-typical' {
    const Typical: React.FC<{
      steps: (string | number)[];
      loop?: number | boolean;
      wrapper?: string;
    }>;
    export default Typical;
  }
  