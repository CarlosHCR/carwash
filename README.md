<h2>Descrição:</h2>
<p>O Gerenciador de Lava-Rápido é uma aplicação desenvolvida para auxiliar na gestão e organização de um negócio de lavagem de veículos.
Ele fornece uma interface intuitiva e funcionalidades para acompanhar os serviços realizados em um lava-rápido, permitindo filtrar e visualizar os serviços por dia, mês e ano.</p>
<p>Através do Gerenciador de Lava-Rápido, os usuários poderão acessar uma tabela contendo informações detalhadas sobre os serviços realizados,
incluindo o tipo de serviço executado e o valor cobrado. A aplicação realiza a soma dos valores de cada serviço de acordo com o filtro selecionado, oferecendo um resumo financeiro fácil de entender.</p>
<h2>Pré-requisitos:</h2>
<ul>
  <li>Docker (versão mais recente)</li>
  <li>Docker Compose (versão mais recente)</li>
  <li>Django (versão mais recente)</li>
</ul>
<h2>Passo 1: Clone o repositório</h2>
<pre><code>git clone https://github.com/seu-usuario/nome-do-repositorio.git</code></pre>
<h2>Passo 2: Navegue para o diretório do projeto</h2>
<pre><code>cd nome-do-repositorio</code></pre>
<h2>Passo 3: Construa e inicie os contêineres do Docker</h2>
<pre><code>docker-compose up --build</code></pre>
<p>Isso irá baixar as imagens necessárias, criar os contêineres e iniciar o projeto.</p>
<h2>Passo 4: Execute as migrações do banco de dados</h2>
<p>Abra outro terminal na mesma pasta do projeto e execute o seguinte comando para executar as migrações do Django:</p>
<pre><code>docker-compose run web python manage.py migrate</code></pre>
<h2>Passo 5: Crie um superusuário</h2>
<p>Execute o seguinte comando para criar um superusuário (um usuário administrador) no Django:</p>
<pre><code>docker-compose run web python manage.py createsuperuser</code></pre>
<p>Siga as instruções na linha de comando para definir um nome de usuário, email e senha para o superusuário.</p>
<h2>Passo 6: Acesse o Gerenciador de Lava-Rápido</h2>
<p>Abra seu navegador e acesse <a href="http://localhost:8000/">http://localhost:8000/</a>. Você verá a interface do Gerenciador de Lava-Rápido.</p>
<p>Agora você pode começar a utilizar o Gerenciador de Lava-Rápido para gerenciar os serviços do lava-rápido, filtrar e visualizar os serviços por dia, mês e ano, e ter uma visão financeira dos serviços realizados. Use as credenciais do superusuário criadas no Passo 6 para acessar a área administrativa em <a href="http://localhost:8000/admin/">http://localhost:8000/admin/</a>.</p>
<p>Lembre-se de que o projeto está configurado para execução localmente em seu ambiente de desenvolvimento. Certifique-se de ter as versões mais recentes do Docker, Docker Compose e Django instaladas em seu sistema antes de iniciar a instalação.</p>
<h2>Informações do Nginx:</h2>
<p>O front-end do Gerenciador de Lava-Rápido é servido pelo Nginx. Você pode acessar duas páginas diferentes através do Nginx:</p>
<ul>
  <li><a href="http://localhost/register/register.html">http://localhost/register/register.html</a></li>
  <li><a href="http://localhost/reports/reports.html">http://localhost/reports/reports.html</a></li>
</ul>
