# projeto-final - Hommy
Projeto Final do treinamento técnico - EJCM

-> Após clonar, para o aplicativo funcionar corretamente:

* Na pasta back:
  - composer install
  - cp .env.example .env
  - Criar o BD no phpMyAdmin
  - Mudar o nome do BD  no .env de acordo com o criado anteriormente
  - php artisan key:generate
  - php artisan migrate:fresh --seed
  - php artisan passport:install
  - php artisan serve

* Na pasta front:
  - npm install
  - ionic serve
