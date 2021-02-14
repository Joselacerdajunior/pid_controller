<PT_BR>
O controle PID é uma ferramenta que tem como objetivo estabilizar um sistema.

As siglas PID vem de:
P - produto;
I - integral;
D - derivada.

Para simular corretamente, este projeto conta com 05 inputs de formato numéricos, sendo eles:
SP - setpoint (é a posição de partida do nivel de água, o ideal é que o tanque inicie vazio (0), mas também é aceitavel outros valores);
KP - constanteP (ideal 1);
KI - constanteI (ideal 1);
KD - constanteD (ideal 0 ~ 3);
idealLevel - Nivel do tanque em que o líquido deve se estabilizar.

É importante lembrar que o idealLevel deve conter valor entre 0 e 100.

Através de linhas de código foi limitado o sistema para que o idealLevel não ultrapasse 100 (vazar agua para fora do tanque) e 0 (não é possivel ter um valor negativo de agua dentro do tanque), quaisquer outros valores entre 0 e 100 serão aceitos.

--------------------------------------------------------------------------------
<ENGLISH>
The PID Controller is used to estabilize systems.

PID means:
P - product;
I - integral;
D - derivative.

To correct simulation, this project has 05 numeric format entries, being then:
SP - setpoint (initial water position in the tank, ideal start in (0), but you can use other values);
KP - constantP (ideal 1);
KI - constantI (ideal 1);
KD - constantD (ideal 0 ~ 3);
idealLevel - Tank level for water to stabilize.

It's important to remember that a idealLevel needs a value between 0 and 100.

Through of code lines the idealLevel is limited to accept values greater than 100 ou less than 0, others values between 0 and 100 is normally accept in system.