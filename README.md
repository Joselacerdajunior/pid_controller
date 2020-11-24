<PT_BR>
O controle PID é uma ferramenta que tem como objetivo estabilizar um sistema.

As siglas PID vem de:
P - produto;
I - integral;
D - derivada.

Para smular corretamente, este projeto conta com 05 inputs de formato numéricos, sendo eles:
SP - setpoint (é a posição de partida do nivel de água, o ideal é que o tanque inicie vazio (0), mas também é aceitavel outros valores);
KP - constanteP (ideal 1);
KI - constanteI (ideal 1);
KD - constanteD (ideal 0 ~ 3);
NivelDesejado - Nivel do tanque em que o líquido deve se estabilizar.

É importante lembrar que o NivelDesejado deve conter valor entre 0 e 100.

Através de linhas de código foi limitado o sistema para que o NivelDesejado não ultrapasse 100 (vazar agua para fora do tanque) e 0 (não é possivel ter um valor negativo de agua dentro do tanque), quaisquer outros valores entre 0 e 100 serão aceitos.
