# use the official lightweight Ruby image.
FROM ruby:2.7-slim

# install production dependencies.
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_FROZEN=true
RUN bundle install

# copy local code to the container image.
COPY . ./

# run the web service on container startup.
CMD ["ruby", "./app.rb"]