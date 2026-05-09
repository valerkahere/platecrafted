// TypeScript Fix: If the error is a red squiggly in VS Code saying "Cannot find module," create a src/types/fonts.d.ts file to tell TypeScript these CSS imports are fine:
declare module "@fontsource-variable/*";
