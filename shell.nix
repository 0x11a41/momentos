{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    vscode-css-languageserver
    superhtml
    vscode-json-languageserver
    typescript-language-server
    typescript
  ];

  shellHook = ''
    echo "Entered dev-shell."
  '';
}
