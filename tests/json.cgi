#!/usr/bin/perl
#!perl
##
## OpenSocial jQuery
##
## Copyright(C) 2008 LEARNING RESOURCE LAB
## http://friendfeed.com/nakajiman
## http://hp.submit.ne.jp/d/16750/
##
## Dual licensed under the MIT and GPL licenses:
## http://www.opensource.org/licenses/mit-license.php
## http://www.gnu.org/licenses/gpl.html
##
use strict;
use CGI;
$CGI::DISABLE_UPLOADS = 1;
$CGI::POST_MAX=1024*1024*1; #1MB

my $cgi = CGI->new();

my $callback = $cgi->param('callback');
if ($callback !~ /^[0-9a-z]+$/) {
  undef $callback;
}

print $cgi->header(
  #-type => 'text/html',
  -type => 'application/json',
  #-type => 'text/javascript',
  -charset => 'utf-8'
);

if ($callback) {
  print <<EOB;
$callback({ say: 'jQuery.ajax is succeeded.' });
EOB
} else {
  print <<EOB;
{ say: 'jQuery.ajax is succeeded.' }
EOB
}

1;
